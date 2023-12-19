import { CommonModule } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { ContentChange, QuillModule } from "ngx-quill";
import { Delta } from "quill";

@Component({
  selector: "app-rich-text-editor",
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./rich-text-editor.component.html",
  styleUrl: "./rich-text-editor.component.css",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true,
    },
  ],
})
export class RichTextEditorComponent implements ControlValueAccessor {
  public editorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editorForm = this.fb.group({
      content: [null],
    });
  }

  public ngOnInit(): void {
    this.editorForm.controls["content"].valueChanges.subscribe((v) => {
      if (this.contentChanged) {
        this.contentChanged(v);
      }
    });
  }

  public writeValue(content: Delta): void {
    console.log("content", content);
    this.editorForm.patchValue({ content });
  }

  public contentChanged: (content: Delta) => void;
  public registerOnChange(fn: (content: Delta) => void): void {
    this.contentChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    // Required by ControlValueAccessor
  }

  public setDisabledState?(isDisabled: boolean): void {
    // Required by ControlValueAccessor
  }
}
