import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from '@ngrx/store';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {playlistReducer} from "./stores/playlist/playlist.reducer";
import {provideEffects} from '@ngrx/effects';
import {PlaylistEffects} from "./stores/playlist/playlist.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      playlists: playlistReducer
    }),
    provideAnimationsAsync(),
    provideEffects(
      PlaylistEffects
    )
  ]
};
