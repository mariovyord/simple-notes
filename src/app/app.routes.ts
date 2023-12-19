import { Routes } from "@angular/router";
import { NotesComponent } from "./notes/notes.component";
import { AboutComponent } from "./about/about.component";

export const routes: Routes = [
  { path: "", component: NotesComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "/about" },
];
