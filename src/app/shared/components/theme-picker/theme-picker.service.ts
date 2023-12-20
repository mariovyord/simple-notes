import { Injectable } from "@angular/core";
import { LocalStorageService } from "../../services/local-storage.service";

@Injectable()
export class ThemePickerService extends LocalStorageService {
  public saveTheme(theme: "light" | "dark") {
    this.set("theme", theme);
  }

  public getTheme() {
    return this.get("theme");
  }
}
