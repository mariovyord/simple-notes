import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideQuillConfig } from "ngx-quill";
import { QuillConfiguration } from "./shared/configs/quill.config";
import { provideServiceWorker } from "@angular/service-worker";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideQuillConfig({
      modules: {
        toolbar: QuillConfiguration.toolbar,
      },
    }),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
};
