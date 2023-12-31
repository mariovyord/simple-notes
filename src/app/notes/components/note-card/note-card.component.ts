import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { NoteEntity } from "../../../shared/types/note";
import { NotesService } from "../../services/notes.service";
import { MetaService } from "../../services/meta.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-note-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./note-card.component.html",
  styleUrl: "./note-card.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent {
  @Input() note: NoteEntity;

  public selectedNoteId = this.metaService.selectedNoteId;

  constructor(private notesService: NotesService, private metaService: MetaService) {}

  public onDelete() {
    this.notesService.deleteNote(this.note.id!);
  }

  public onSelect() {
    this.metaService.selectNote(this.note.id!);
  }
}
