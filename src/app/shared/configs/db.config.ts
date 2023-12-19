import Dexie, { Table } from "dexie";
import { INote } from "../types/note";
import { IMeta } from "../types/meta";

export class AppDB extends Dexie {
  notes!: Table<INote, string>;
  meta!: Table<IMeta, string>;

  constructor() {
    super("simple-notes");
    this.version(1).stores({
      notes: "++id, title, content, createdAt, updatedAt", // Primary key and indexed props
      meta: "++id, selectedNoteId",
    });
  }
}

export const db = new AppDB();
