import { Component } from "@angular/core";
import { ThemePickerService } from "./theme-picker.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-theme-picker",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./theme-picker.component.html",
  styleUrl: "./theme-picker.component.css",
  providers: [ThemePickerService],
})
export class ThemePickerComponent {
  public isDark = false;

  constructor(private themePickerService: ThemePickerService) {
    const theme = this.themePickerService.getTheme();
    if (theme === "dark") {
      this.isDark = true;
    } else {
      this.isDark = false;
    }
  }

  public changeTheme(isDark: boolean) {
    if (isDark) {
      this.isDark = true;
      this.themePickerService.saveTheme("dark");
    } else {
      this.isDark = false;
      this.themePickerService.saveTheme("light");
    }
  }
}
