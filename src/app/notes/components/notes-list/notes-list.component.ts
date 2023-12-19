import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NoteCardComponent } from "../note-card/note-card.component";
import { INote } from "../../../shared/types/note";

@Component({
  selector: "app-notes-list",
  standalone: true,
  imports: [NoteCardComponent],
  templateUrl: "./notes-list.component.html",
  styleUrl: "./notes-list.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
  @Input({ required: true }) public notes: INote[];
  @Output() public onCreate = new EventEmitter();
}
