import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { BehaviorSubject } from "rxjs";

const SELECTED_NOTE_ID_KEY = "selectedNoteId";

@Injectable({
  providedIn: "root",
})
export class MetaService extends LocalStorageService {
  private _selectedNoteId = new BehaviorSubject<string | null>(null);

  get selectedNoteId() {
    if (!this._selectedNoteId.value) {
      const id = this.get<string | null>(SELECTED_NOTE_ID_KEY);
      this._selectedNoteId.next(id);
    }

    return this._selectedNoteId.asObservable();
  }

  public selectNote(id: string): void {
    this.set<string>(SELECTED_NOTE_ID_KEY, id);
    this._selectedNoteId.next(id);
  }
}
