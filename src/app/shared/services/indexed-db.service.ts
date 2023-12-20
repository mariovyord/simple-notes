import { Observable, catchError, from, throwError } from "rxjs";
import { db } from "../configs/db.config";
import { INote } from "../types/note";

export enum Collection {
  "notes" = "notes",
}

export abstract class IndexedDbService {
  private collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  protected getAll(): Observable<INote[]> {
    return from(db[this.collection].toArray()).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  protected getOne(id: string): Observable<INote | undefined> {
    return from(db[this.collection].get(id)).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  protected post(data: INote): Observable<string> {
    return from(db[this.collection].add(data)).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  protected put(data: INote): Observable<string> {
    return from(db[this.collection].put(data, data.id)).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  protected remove(id: string): Observable<void> {
    return from(db[this.collection].delete(id)).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }
}
