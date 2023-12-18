import { Component, Input } from "@angular/core";
import { NoteCardComponent } from "../note-card/note-card.component";
import { INote } from "../../types/note";

@Component({
  selector: "app-notes-list",
  standalone: true,
  imports: [NoteCardComponent],
  templateUrl: "./notes-list.component.html",
  styleUrl: "./notes-list.component.css",
})
export class NotesListComponent {
  @Input() notes: INote[];
}
