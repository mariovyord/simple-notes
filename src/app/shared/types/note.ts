import { Delta } from "quill";
import { truncateToTitle } from "../../utils/truncate-to-title";

export interface INote {
  id?: string;
  content: Delta | null;
  createdAt: Date;
  updatedAt: Date;
}

export class NoteEntity implements INote {
  id: string;
  content: Delta | null;
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
    if (!this.content || !this.content.ops) {
      return "A Note";
    }

    const firstOp = this.content.ops[0].insert.trim(); // takes the first operation
    const cut = firstOp.split("\n")[0]; // takes the first line
    return truncateToTitle(cut);
  }
}
