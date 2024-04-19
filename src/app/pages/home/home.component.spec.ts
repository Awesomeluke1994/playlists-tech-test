import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {PlaylistService} from "../../services/playlist.service";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {provideNoopAnimations} from "@angular/platform-browser/animations";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {PlaylistActions} from "../../stores/playlist/playlist.actions";
import {
  errorGettingPlaylists,
  getPlaylists,
  isPlaylistsLoading,
  playListName
} from "../../stores/playlist/playlist.selectors";
import {PlaylistContent} from "../../types/playlist";
import {TestScheduler} from "rxjs/internal/testing/TestScheduler";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let storeSelectSpy: jasmine.Spy;
  let testScheduler: TestScheduler

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [PlaylistService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore(),
        provideNoopAnimations()
      ]
    })
      .compileComponents();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');

    const playLists: PlaylistContent[] = [
      {
        url: 'testUrl',
        id: 'TestId1',
        name: 'testName',
        curator_name: 'testCuratorName',
        kind: 'playlist',
        artwork: 'artworkUrl'
      },
      {
        url: 'testUrl',
        id: 'TestId1',
        name: 'testName2',
        curator_name: 'testCuratorName',
        kind: 'playlist',
        artwork: 'artworkUrl'
      }
    ]

    store.overrideSelector(getPlaylists, playLists);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch a action to get the playlists', () => {
    const action = PlaylistActions.getPlaylists();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  })

  it('Should select playlist name from store', () => {
    const storeSelectSpy = spyOn(store, 'select');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(storeSelectSpy).toHaveBeenCalledWith(playListName);
  })

  it('Should select playlists from store', () => {
    const storeSelectSpy = spyOn(store, 'select');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(storeSelectSpy).toHaveBeenCalledWith(getPlaylists);
  })

  it('Should select if the playlist is loading', () => {
    const storeSelectSpy = spyOn(store, 'select');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    expect(storeSelectSpy).toHaveBeenCalledWith(isPlaylistsLoading);
  })


  it('Should select if getting the playlist has errored', fakeAsync(() => {
    const storeSelectSpy = spyOn(store, 'select');

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;


    expect(storeSelectSpy).toHaveBeenCalledWith(errorGettingPlaylists);
  }))

  it('Should filter out playlists', fakeAsync(() => {
    let results: PlaylistContent[] = [];
    component.filteredPlaylists$.subscribe((playlists) => {
      results = playlists;
    })

    component.nameFilterControl.setValue("shouldShowNone");
    tick(50);
    fixture.detectChanges();

    flush();

    expect(results.length).toBe(0);
  }))

  it('Should filter out playlists and find one', fakeAsync(() => {
    let results: PlaylistContent[] = [];
    component.filteredPlaylists$.subscribe((playlists) => {
      results = playlists;
    })

    component.nameFilterControl.setValue("testName2");
    tick(50);
    fixture.detectChanges();

    flush();

    expect(results.length).toBe(1);
  }))

  it('Should filter none', fakeAsync(() => {
    let playlistContents: PlaylistContent[] = [];
    component.filteredPlaylists$.subscribe((playlists) => {
      playlistContents = playlists;
    })

    tick(50);
    fixture.detectChanges();

    flush();

    expect(playlistContents.length).toBe(2);
  }))

  it("Should get all playlists names", () => {
    component.getAllPlaylistsNames$.subscribe((playlistNames) => {
      expect(playlistNames.length).toBe(2)
    })
  })

  it("Should filter playlists names when filter has been typed into", fakeAsync(() => {
    let allPlaylistsName: string[] = [];
    component.getAllPlaylistsNames$.subscribe((playlists) => {
      allPlaylistsName = playlists;
    })

    component.nameFilterControl.setValue("testName2");
    tick(50);
    fixture.detectChanges();

    flush();

    expect(allPlaylistsName.length).toBe(1);
  }))

})
