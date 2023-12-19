import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideQuillConfig } from "ngx-quill";
import { QuillConfiguration } from "./shared/configs/quill.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideQuillConfig({
      modules: {
        toolbar: QuillConfiguration.toolbar,
      },
    }),
  ],
};
