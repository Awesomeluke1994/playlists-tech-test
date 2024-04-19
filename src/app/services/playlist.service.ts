import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, takeUntil} from "rxjs";
import {FeaturedPlaylists, Playlists} from "../types/playlist";

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {

  constructor(private httpClient: HttpClient) {

  }

  public getPlaylists(destroyed$: Observable<void>): Observable<FeaturedPlaylists> {
    return this.httpClient.get<Playlists>("https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json")
      .pipe(
        map((playlist) => {
          return playlist.featuredPlaylists;
        }),
        takeUntil(destroyed$)
      );
  }
}
