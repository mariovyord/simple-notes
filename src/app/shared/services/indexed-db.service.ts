import { Observable, from } from "rxjs";
import { db } from "../configs/db";
import { INote } from "../types/note";

export enum Collection {
  "notes" = "notes",
}

export abstract class IndexedDbService {
  private collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }

  public getAll(): Observable<INote[]> {
    return from(db[this.collection].toArray());
  }

  public getOne(id: string): Observable<INote | undefined> {
    return from(db[this.collection].get(id));
  }

  public post(data: INote): Observable<string> {
    return from(db[this.collection].add(data));
  }

  public put(data: INote): Observable<string> {
    return from(db[this.collection].put(data));
  }

  public remove(id: string): Observable<void> {
    return from(db[this.collection].delete(id));
  }
}
