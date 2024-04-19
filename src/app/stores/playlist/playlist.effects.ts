import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PlaylistActions} from "./playlist.actions";
import {catchError, EMPTY, exhaustMap, map, of, tap} from "rxjs";
import {PlaylistService} from "../../services/playlist.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class PlaylistEffects {
  constructor(private actions$: Actions, private playlistService: PlaylistService, private snackBar: MatSnackBar) {
  }

  loadPlaylists$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistActions.getPlaylists),
    exhaustMap(() => {
        return this.playlistService.getPlaylists()
          .pipe(
            map(playlists => {
              return PlaylistActions.getPlaylistsSuccess({playlists})
            }),
            catchError(() => {
              return of(PlaylistActions.getPlaylistsError());
            }),
          );
      }
    )
  ))

  loadPlaylistsSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistActions.getPlaylistsSuccess),
    tap(() => {
      this.sendSnackBarMessage('Successfully retrieved playlists')
    })
  ), { dispatch: false })

  loadPlaylistsFailed$ = createEffect(() => this.actions$.pipe(
    ofType(PlaylistActions.getPlaylistsError),
    tap(() => {
      this.sendSnackBarMessage('Failed to retrieve playlists')
    })
  ), { dispatch: false })

  sendSnackBarMessage = (message: string) => {
    this.snackBar.open(message, '', {
      duration: 1000
    })
  }
}

