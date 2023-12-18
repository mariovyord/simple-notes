import { Component, Input } from "@angular/core";
import { INote } from "../../types/note";

@Component({
  selector: "app-note-card",
  standalone: true,
  imports: [],
  templateUrl: "./note-card.component.html",
  styleUrl: "./note-card.component.css",
})
export class NoteCardComponent {
  @Input() note: INote;

  public displayDeleteBtn = false;
}
