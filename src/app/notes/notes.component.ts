import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NotesEditorComponent } from "./components/notes-editor/notes-editor.component";
import { NotesListComponent } from "./components/notes-list/notes-list.component";
import { NotesService } from "./services/notes.service";
import { CommonModule } from "@angular/common";
import { MetaService } from "./services/meta.service";
import { of, switchMap } from "rxjs";
import { NoteEntity } from "../shared/types/note";
import { DrawerComponent } from "../shared/components/drawer/drawer.component";
import { NotificationComponent } from "../shared/components/notification/notification.component";

@Component({
  selector: "app-notes",
  standalone: true,
  imports: [NotesEditorComponent, NotesListComponent, CommonModule, DrawerComponent, NotificationComponent],
  templateUrl: "./notes.component.html",
  styleUrl: "./notes.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  public notes$ = this.notesService.notes$;
  public selectedNote$ = this.metaService.selectedNoteId.pipe(
    switchMap((id) => {
      return this.notes$.pipe(
        switchMap((arr) => {
          const filtered = arr.filter((x) => x.id === id);
          return of(filtered[0]);
        })
      );
    })
  );

  constructor(private notesService: NotesService, private metaService: MetaService) {}

  public createNote(): void {
    this.notesService.createNote();
  }

  public updateNote(note: NoteEntity): void {
    this.notesService.updateNote(note);
  }
}
