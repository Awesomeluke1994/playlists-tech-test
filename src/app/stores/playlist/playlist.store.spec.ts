import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PlaylistEffects} from './playlist.effects';
import {PlaylistService} from '../../services/playlist.service';
import {PlaylistActions} from './playlist.actions';
import {FeaturedPlaylists} from "../../types/playlist";
import {describe} from "local-cypress";
import {initialState, playlistReducer} from "./playlist.reducer";

describe('PlaylistEffects', () => {
  let effects: PlaylistEffects;
  let actions$: Observable<any>;
  let playlistService: jasmine.SpyObj<PlaylistService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlaylistEffects,
        provideMockActions(() => actions$),
        {
          provide: PlaylistService,
          useValue: jasmine.createSpyObj('PlaylistService', ['getPlaylists'])
        },
        {
          provide: MatSnackBar,
          useValue: jasmine.createSpyObj('MatSnackBar', ['open'])
        }
      ]
    });

    effects = TestBed.inject(PlaylistEffects);
    playlistService = TestBed.inject(PlaylistService) as jasmine.SpyObj<PlaylistService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should dispatch getPlaylistsSuccess when playlists are loaded successfully', () => {
    const playlists: FeaturedPlaylists = {
      name: 'Playlist name',
      content: []
    }
    playlistService.getPlaylists.and.returnValue(of(playlists));
    actions$ = of(PlaylistActions.getPlaylists());

    effects.loadPlaylists$.subscribe(action => {
      expect(action).toEqual(PlaylistActions.getPlaylistsSuccess({playlists}));
      expect(playlistService.getPlaylists).toHaveBeenCalled();
    });
  });

  it('should dispatch getPlaylistsError when the playlist service fails', () => {
    playlistService.getPlaylists.and.returnValue(throwError(() => new Error('Network error')));
    actions$ = of(PlaylistActions.getPlaylists());

    effects.loadPlaylists$.subscribe(action => {
      expect(action).toEqual(PlaylistActions.getPlaylistsError());
      expect(playlistService.getPlaylists).toHaveBeenCalled();
    });
  });

  it('should show a success snackbar message when playlists are loaded successfully', () => {
    actions$ = of(PlaylistActions.getPlaylistsSuccess({playlists: {name: 'playlist name', content: []}}))

    effects.loadPlaylistsSuccess$.subscribe(() => {
      expect(snackBar.open).toHaveBeenCalledWith('Successfully retrieved playlists', '', {duration: 1000})
    })
  })

  it('should show an error snackbar message when loading playlists fails', () => {
    actions$ = of(PlaylistActions.getPlaylistsError())

    effects.loadPlaylistsFailed$.subscribe(() => {
      expect(snackBar.open).toHaveBeenCalledWith('Failed to retrieve playlists', '', {duration: 1000})
    })
  })

});
describe('PlaylistReducerTest', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = playlistReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set isLoading to true on getPlaylists', () => {
    const action = PlaylistActions.getPlaylists();
    const state = playlistReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
    expect(state.errorGettingPlaylists).toBeFalse();
  });

  it('should update playlists and set isLoading to false on getPlaylistsSuccess', () => {
    const playlists: FeaturedPlaylists = {
      name: "playlist",
      content: []
    }
    const action = PlaylistActions.getPlaylistsSuccess({ playlists });
    const state = playlistReducer(initialState, action);

    expect(state.playlists).toEqual(playlists);
    expect(state.isLoading).toEqual(false);
  });

  it('should set errorGettingPlaylists to true and isLoading to false on getPlaylistsError', () => {
    const action = PlaylistActions.getPlaylistsError();
    const state = playlistReducer(initialState, action);

    expect(state.errorGettingPlaylists).toEqual(true);
    expect(state.isLoading).toEqual(false);
  });
})
