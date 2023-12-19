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

  protected getAll(): Observable<INote[]> {
    return from(db[this.collection].toArray());
  }

  protected getOne(id: string): Observable<INote | undefined> {
    return from(db[this.collection].get(id));
  }

  protected post(data: INote): Observable<string> {
    return from(db[this.collection].add(data));
  }

  protected put(data: INote): Observable<string> {
    return from(db[this.collection].put(data, data.id));
  }

  protected remove(id: string): Observable<void> {
    return from(db[this.collection].delete(id));
  }
}
