import { Injectable } from "@angular/core";
import { INote, NoteEntity } from "../../shared/types/note";
import { BehaviorSubject, Observable, finalize, map, take } from "rxjs";
import { Collection, IndexedDbService } from "../../shared/services/indexed-db.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MetaService } from "./meta.service";
import { NotificationService } from "../../shared/components/notification/notification.service";

@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class NotesService extends IndexedDbService {
  private _notes$ = new BehaviorSubject<INote[]>([]);
  private _initialized = false;
  private _fetching = false;

  constructor(private metaService: MetaService, private notificationService: NotificationService) {
    super(Collection.notes);
  }

  get notes$(): Observable<NoteEntity[]> {
    if (!this._initialized && !this._fetching) {
      this._fetching = true;

      this.getAll()
        .pipe(
          untilDestroyed(this),
          finalize(() => {
            this._initialized = true;
            this._fetching = false;
          })
        )
        .subscribe({
          next: (n) => {
            this._notes$.next(n);
          },
          error: () => {
            this.notificationService.setErrorNotification("Failed to fetch the notes");
          },
        });
    }

    return this._notes$.asObservable().pipe(map((arr) => arr.map((n) => new NoteEntity(n))));
  }

  public createNote(): void {
    const draftNote: INote = {
      content: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.post(draftNote)
      .pipe(take(1))
      .subscribe({
        next: (id) => {
          const notes = structuredClone(this._notes$.value);
          const newNote: INote = {
            id,
            ...draftNote,
          };

          notes.push(newNote);

          this._notes$.next(notes);
          this.metaService.selectNote(id);
        },
        error: () => {
          this.notificationService.setErrorNotification(
            "Failed to create a note. Please refresh the app and try again."
          );
        },
      });
  }

  public getNoteById(id: string): NoteEntity | undefined {
    const note = this._notes$.value.find((v) => v.id === id);
    if (!note) {
      return note;
    }

    return new NoteEntity(note);
  }

  public updateNote(note: NoteEntity): void {
    note.updatedAt = new Date();

    this.put(note)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const notes = structuredClone(this._notes$.value);
          const i = notes.findIndex((x) => x.id === note.id);
          notes[i] = note;
          this._notes$.next(notes);
        },
        error: () => {
          this.notificationService.setErrorNotification(
            "Failed to save note. Please try changing the text to update it again."
          );
        },
      });
  }

  public deleteNote(id: string): void {
    this.remove(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          let notes = structuredClone(this._notes$.value);
          notes = notes.filter((x) => x.id !== id);

          this._notes$.next(notes);
          if (this._notes$.value.length > 0) {
            const id = this._notes$.value[0].id!;
            this.metaService.selectNote(id);
          }
        },
        error: () => {
          this.notificationService.setErrorNotification("Failed to delete note. Please refresh the app and try again.");
        },
      });
  }
}
