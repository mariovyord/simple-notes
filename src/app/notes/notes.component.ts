import { Component } from '@angular/core';
import { NotesEditorComponent } from './components/notes-editor/notes-editor.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NotesEditorComponent, NotesListComponent],
  templateUrl: './notes.component.html',
})
export class NotesComponent {}
