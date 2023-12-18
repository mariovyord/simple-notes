import { Component, OnInit } from "@angular/core";
import { NotesEditorComponent } from "./components/notes-editor/notes-editor.component";
import { NotesListComponent } from "./components/notes-list/notes-list.component";
import { NotesService } from "./services/notes.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-notes",
  standalone: true,
  imports: [NotesEditorComponent, NotesListComponent, CommonModule],
  templateUrl: "./notes.component.html",
  styleUrl: "./notes.component.css",
})
export class NotesComponent {
  public notes$ = this.notesService.notes;

  constructor(private notesService: NotesService) {}
}
