import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardComponent } from './playlist-card.component';
import {PlaylistContent} from "../../types/playlist";

describe('PlaylistCardComponent', () => {
  let component: PlaylistCardComponent;
  let fixture: ComponentFixture<PlaylistCardComponent>;

  const playlist: PlaylistContent = {
    kind: 'playlist',
    curator_name: 'curator - name',
    artwork: 'url_for_artwork',
    name: 'playlist name',
    id: 'idPlaylist',
    url: 'url_to_playlist'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistCardComponent);
    component = fixture.componentInstance;


    component.playlistContent = playlist;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set playlistContent when provided', () => {
    expect(component.playlistContent).toEqual(playlist);
  });

  it('should toggle showInformation correctly', () => {
    component.showInfo();
    expect(component.showInformation).toBeTrue();

    component.hideInfo();
    expect(component.showInformation).toBeFalse();
  });

  it('should open the correct URL when openPlaylistUrl is called', () => {
    const content = { url: 'https://example.com', id: '1', name: 'test', curator_name: 'curator', kind: 'playlist', artwork: 'artworkUrl' };
    component.playlistContent = content;

    spyOn(window, 'open');
    component.openPlaylistUrl();

    expect(window.open).toHaveBeenCalledWith(content.url, '_blank');
  });
});
