import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getStorage, provideStorage} from "@angular/fire/storage";
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom([
        provideFirebaseApp(() => initializeApp({
            apiKey: "AIzaSyDyIFDaLMlQgl-xbAaeFi9fQny3aAYMizo",
            authDomain: "angular-firebase-demo-10001.firebaseapp.com",
            projectId: "angular-firebase-demo-10001",
            storageBucket: "angular-firebase-demo-10001.appspot.com",
            messagingSenderId: "381125680019",
            appId: "1:381125680019:web:15d3810b037f7e7cf1e666"
        })),
        provideStorage(() => getStorage())
    ]), provideAnimations(), provideAnimations()]
};
