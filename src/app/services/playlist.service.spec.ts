import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FeaturedPlaylists, Playlists} from "../types/playlist";
import {Subject} from "rxjs";

describe('PlaylistService', () => {
  let service: PlaylistService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PlaylistService
      ]
    });
    service = TestBed.inject(PlaylistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  });

  it('should retrieve playlists and map the result correctly', () => {
    const mockPlaylists: Playlists = {
      featuredPlaylists: {
        name: 'Summer Hits',
        content: []
      }
    };

    const destroyed = new Subject<void>();

    service.getPlaylists(destroyed).subscribe((featuredPlaylists: FeaturedPlaylists) => {
      expect(featuredPlaylists.name).toEqual('Summer Hits');
      expect(featuredPlaylists.content).toEqual([]);
    });

    const req = httpMock.expectOne('https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlaylists);
  });
});
