import { Injectable } from "@angular/core";
import { INote, NoteEntity } from "../../shared/types/note";
import { BehaviorSubject, Observable, catchError, finalize, from, map, mergeMap, of, switchMap, take, tap } from "rxjs";
import { Collection, IndexedDbService } from "../../shared/services/indexed-db.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

/**
 * TODOs:
 * 1. Create DB service to abstract away the db interface - DONE
 * 2. Improve better handling - show notification of error
 */
@UntilDestroy()
@Injectable({
  providedIn: "root",
})
export class NotesService extends IndexedDbService {
  private _notes$ = new BehaviorSubject<INote[]>([]);
  private _initialized = false;
  private _fetching = false;

  constructor() {
    super(Collection.notes);
  }

  get notes$(): Observable<NoteEntity[]> {
    if (!this._initialized && !this._fetching) {
      this._fetching = true;

      this.getAll()
        .pipe(
          untilDestroyed(this),
          catchError((error) => {
            console.error("Error fetching notes:", error);
            return of([]);
          }),
          finalize(() => {
            this._initialized = true;
            this._fetching = false;
          })
        )
        .subscribe((n) => {
          this._notes$.next(n);
        });
    }

    return this._notes$.asObservable().pipe(map((arr) => arr.map((n) => new NoteEntity(n))));
  }

  public createNote(): void {
    const draftNote = {
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.post(draftNote)
      .pipe(take(1))
      .subscribe((id) => {
        const notes = structuredClone(this._notes$.value);
        const newNote: INote = {
          id,
          ...draftNote,
        };

        notes.push(newNote);

        this._notes$.next(notes);
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
      .subscribe(() => {
        const notes = structuredClone(this._notes$.value);
        const i = notes.findIndex((x) => x.id === note.id);
        notes[i] = note;
        this._notes$.next(notes);
      });
  }

  public deleteNote(id: string): void {
    this.remove(id)
      .pipe(take(1))
      .subscribe(() => {
        let notes = structuredClone(this._notes$.value);
        notes = notes.filter((x) => x.id !== id);

        this._notes$.next(notes);
      });
  }
}
