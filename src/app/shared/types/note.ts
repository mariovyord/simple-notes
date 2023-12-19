export interface INote {
  id?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class NoteEntity implements INote {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(note: INote) {
    // Check if the 'id' property exists in the incoming 'note' object
    if (note.id === undefined) {
      throw new Error("ID is required for a Note");
    }

    // Assign properties to the class instance
    this.id = note.id;
    this.content = note.content;
    this.createdAt = note.createdAt;
    this.updatedAt = note.updatedAt;
  }

  get title() {
    if (!this.content) {
      return "Draft note";
    }

    return this.content.split("\n")[0].substring(0, 35).trim() + "...";
  }
}
