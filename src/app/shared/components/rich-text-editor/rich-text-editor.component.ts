import { CommonModule } from "@angular/common";
import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ContentChange, QuillModule } from "ngx-quill";
import { Delta } from "quill";

@Component({
  selector: "app-rich-text-editor",
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
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
  public content = "";
  public contentChanged: (content: Delta) => void;

  public onContentChanged(event: ContentChange): void {
    console.log("event", event);
    console.log("VALUE", this.content);
    if (this.contentChanged) {
      this.contentChanged(event.delta);
    }
  }

  public writeValue(content: string): void {
    this.content = content;
  }

  public registerOnChange(fn: (content: Delta) => void): void {
    this.contentChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }

  public setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
