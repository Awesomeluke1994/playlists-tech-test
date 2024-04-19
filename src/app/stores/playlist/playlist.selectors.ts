import {createFeatureSelector, createSelector} from "@ngrx/store";
import {playlistState} from "./playlist.reducer";

export const selectPlaylistsState = createFeatureSelector<playlistState>('playlists');

export const playListName = createSelector(
  selectPlaylistsState,
  (playlistState) => {
    return playlistState.playlists.name;
  }
)

export const getPlaylists = createSelector(
  selectPlaylistsState,
  (playlistState) => {
    return playlistState.playlists.content;
  }
)

export const isPlaylistsLoading = createSelector(
  selectPlaylistsState,
  (playlistState) => {
    return playlistState.isLoading
  }
)

export const errorGettingPlaylists = createSelector(
  selectPlaylistsState,
  (playlistState) => {
    return playlistState.errorGettingPlaylists
  }
)
