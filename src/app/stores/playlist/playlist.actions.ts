import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {FeaturedPlaylists} from "../../types/playlist";

export const PlaylistActions = createActionGroup({
  source: 'playlists',
  events: {
    'getPlaylists': emptyProps(),
    'getPlaylistsSuccess': props<{playlists: FeaturedPlaylists}>(),
    'getPlaylistsError': emptyProps(),
  }
})
