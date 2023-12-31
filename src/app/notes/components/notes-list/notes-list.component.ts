import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NoteCardComponent } from "../note-card/note-card.component";
import { NoteEntity } from "../../../shared/types/note";
import { RouterLink } from "@angular/router";
import { ThemePickerComponent } from "../../../shared/components/theme-picker/theme-picker.component";

@Component({
  selector: "app-notes-list",
  standalone: true,
  imports: [NoteCardComponent, RouterLink, ThemePickerComponent],
  templateUrl: "./notes-list.component.html",
  styleUrl: "./notes-list.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  @Input({ required: true }) public notes: NoteEntity[];
  @Output() public createNote = new EventEmitter();

  public handleCreate(): void {
    this.createNote.emit();
  }
}
