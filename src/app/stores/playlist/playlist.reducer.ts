import { createReducer, on } from '@ngrx/store';
import {PlaylistActions} from "./playlist.actions";
import {FeaturedPlaylists} from "../../types/playlist";

export interface playlistState {
  playlists: FeaturedPlaylists;
  isLoading: boolean;
  errorGettingPlaylists: boolean;
}
export const initialState: playlistState = {
  playlists: {
    content: [],
    name: '',
  },
  isLoading: false,
  errorGettingPlaylists: false
};

export const playlistReducer = createReducer(
  initialState,
  on(PlaylistActions.getPlaylists, (state, {} ) => ({
    ...state,
    isLoading: true
  })),
  on(PlaylistActions.getPlaylistsSuccess, (state, {playlists} ) => ({
    ...state,
    playlists: playlists,
    isLoading: false
  })),
  on(PlaylistActions.getPlaylistsError, (state, {}) => {
    return {
      ...state,
      errorGettingPlaylists: true,
      isLoading: false
    }
  })
);
