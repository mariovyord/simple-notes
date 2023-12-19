import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { INote } from "../../types/note";
import { NotesService } from "../../services/notes.service";

@Component({
  selector: "app-note-card",
  standalone: true,
  imports: [],
  templateUrl: "./note-card.component.html",
  styleUrl: "./note-card.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent {
  @Input() note: INote;

  public displayDeleteBtn = false;

  constructor(private notesService: NotesService) {}

  public onDelete() {
    this.notesService.deleteNote(this.note.id!);
  }
}
