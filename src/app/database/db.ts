import Dexie, { Table } from "dexie";
import { INote } from "../notes/types/note";

export class AppDB extends Dexie {
  notes!: Table<INote, string>;

  constructor() {
    super("simple-notes");
    this.version(1).stores({
      notes: "++id, title, content, createdAt, updatedAt", // Primary key and indexed props
    });
  }
}

export const db = new AppDB();
