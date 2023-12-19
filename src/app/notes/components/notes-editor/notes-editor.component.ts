import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NoteEntity } from "../../../shared/types/note";
import { QuillEditorComponent } from "ngx-quill";
import { RichTextEditorComponent } from "../../../shared/components/rich-text-editor/rich-text-editor.component";

@UntilDestroy()
@Component({
  selector: "app-notes-editor",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RichTextEditorComponent],
  templateUrl: "./notes-editor.component.html",
  styleUrl: "./notes-editor.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesEditorComponent implements OnChanges {
  @Input() public note: NoteEntity;
  @Output() public onTextUpdate = new EventEmitter<NoteEntity>();

  public contentControl: FormControl;
  public debounce: number = 100;
  private subscribtion: Subscription;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes["note"] && changes["note"].previousValue?.id !== changes["note"].currentValue.id) {
      if (this.subscribtion) {
        this.subscribtion.unsubscribe();
      }

      this.contentControl = new FormControl("");
      this.contentControl.setValue(this.note.content || "");

      this.subscribtion = this.contentControl.valueChanges
        .pipe(debounceTime(this.debounce), distinctUntilChanged(), untilDestroyed(this))
        .subscribe((value) => {
          this.note.content = value;
          console.log(value, this.note);
          this.onTextUpdate.emit(this.note);
        });
    }
  }
}
