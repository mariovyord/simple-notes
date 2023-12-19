import { CommonModule } from "@angular/common";
import { Component, OnInit, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { QuillModule } from "ngx-quill";
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
export class RichTextEditorComponent implements ControlValueAccessor, OnInit {
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
    this.editorForm.patchValue({ content });
  }

  public contentChanged: (content: Delta) => void;
  public registerOnChange(fn: (content: Delta) => void): void {
    this.contentChanged = fn;
  }

  public registerOnTouched(): void {
    // Required by ControlValueAccessor
  }

  public setDisabledState(): void {
    // Required by ControlValueAccessor
  }
}
