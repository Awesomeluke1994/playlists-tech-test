import { Component } from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {PlaylistCardComponent} from "../../components/playlist-card/playlist-card.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {FeaturedPlaylists, PlaylistContent} from "../../types/playlist";
import {PlaylistService} from "../../services/playlist.service";
import {MatIcon} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {PlaylistActions} from "../../stores/playlist/playlist.actions";
import {
  getPlaylists,
  errorGettingPlaylists,
  isPlaylistsLoading,
  playListName,
} from "../../stores/playlist/playlist.selectors";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatInput,
    NgIf,
    PlaylistCardComponent,
    ReactiveFormsModule,
    MatPrefix,
    MatIcon,
    MatProgressSpinner,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public playlists$: Observable<PlaylistContent[]>;
  public nameFilterControl = new FormControl<string>('');
  public filteredPlaylists$: Observable<PlaylistContent[]>;
  public playListName$: Observable<string>;
  public playlistsAreLoading$: Observable<boolean>;
  public errorGettingPlaylists$: Observable<boolean>;
  public getAllPlaylistsNames$: Observable<string[]>;
  constructor(private playlistService: PlaylistService, private store: Store) {
    this.store.dispatch(PlaylistActions.getPlaylists());
    this.playListName$ = this.store.select(playListName)
    this.playlists$ = this.store.select(getPlaylists)
    this.playlistsAreLoading$ = this.store.select(isPlaylistsLoading)
    this.errorGettingPlaylists$ = this.store.select(errorGettingPlaylists)

    const filterValue$ = this.nameFilterControl.valueChanges.pipe(startWith(''))

    this.filteredPlaylists$ = combineLatest([this.playlists$, filterValue$])
      .pipe(
        map(([featuredPlaylists, filterValue]) => {
          if(!filterValue) {
            return featuredPlaylists;
          }
          return featuredPlaylists.filter((playlist) => playlist.name.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) != -1)
        })
      )

    this.getAllPlaylistsNames$ = this.filteredPlaylists$.pipe(map((playList) => {
      return playList.map(currentPlaylist => currentPlaylist.name)
    }))

  }

  protected readonly playListName = playListName;
}
