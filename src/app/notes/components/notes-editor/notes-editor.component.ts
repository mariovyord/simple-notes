import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-notes-editor",
  standalone: true,
  imports: [],
  templateUrl: "./notes-editor.component.html",
  styleUrl: "./notes-editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesEditorComponent {}
