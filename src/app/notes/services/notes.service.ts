import { Injectable } from "@angular/core";
import { INote } from "../types/note";
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  from,
  of,
  shareReplay,
  tap,
} from "rxjs";
import { db } from "../../database/db";

const mockNotes: INote[] = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discussed project timelines and goals.",
    createdAt: new Date("2023-01-10"),
    updatedAt: new Date("2023-01-11"),
  },
  {
    id: "2",
    title: "Shopping List",
    content: "Milk, eggs, bread, vegetables.",
    createdAt: new Date("2023-02-05"),
    updatedAt: new Date("2023-02-05"),
  },
  {
    id: "3",
    title: "Gym Workout",
    content: "Cardio and weightlifting routine.",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-21"),
  },
  {
    id: "4",
    title: "Book Review",
    content: 'Summary and thoughts on "The Great Gatsby".',
    createdAt: new Date("2023-04-15"),
    updatedAt: new Date("2023-04-16"),
  },
  {
    id: "5",
    title: "Vacation Plans",
    content: "Research destinations and make bookings.",
    createdAt: new Date("2023-05-30"),
    updatedAt: new Date("2023-05-31"),
  },
];

/**
 * TODOs:
 * 1. Create DB service to abstract away the db interface
 * 2. Improve better handling - show notification of error
 */
@Injectable({
  providedIn: "root",
})
export class NotesService {
  private _notes$ = new BehaviorSubject<INote[]>([]);
  private _initialized = false;
  private _fetching = false;

  get notes(): Observable<INote[]> {
    if (!this._initialized && !this._fetching) {
      this._fetching = true;

      this.fetchNotes()
        .pipe(
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

    return this._notes$.asObservable();
  }

  public async createNote() {
    const draftNote = {
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const id = await db.notes.add(draftNote as INote);

    const notes = structuredClone(this._notes$.value);
    const newNote: INote = {
      id,
      ...draftNote,
    };

    notes.push(newNote);

    this._notes$.next(notes);
  }

  public getNoteById(id: string): INote | undefined {
    return this._notes$.value.find((v) => v.id === id);
  }

  public updateNote(note: INote): void {
    note.updatedAt = new Date();
    db.notes.put(note).then(() => {
      const notes = structuredClone(this._notes$.value);
      const i = notes.findIndex((x) => x.id === note.id);
      notes[i] = note;

      this._notes$.next(notes);
    });
  }

  public deleteNote(id: string): Observable<void> {
    return from(db.notes.delete(id)).pipe(
      tap(() => {
        let notes = structuredClone(this._notes$.value);
        notes = notes.filter((x) => x.id !== id);

        this._notes$.next(notes);
      })
    );
  }

  private fetchNotes(): Observable<INote[]> {
    return from(db.notes.toArray());
  }
}
