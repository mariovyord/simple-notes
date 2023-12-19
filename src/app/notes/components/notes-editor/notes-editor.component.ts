import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { INote } from "../../../shared/types/note";

@Component({
  selector: "app-notes-editor",
  standalone: true,
  imports: [],
  templateUrl: "./notes-editor.component.html",
  styleUrl: "./notes-editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesEditorComponent {
  @Input() public note: INote | null;
}
