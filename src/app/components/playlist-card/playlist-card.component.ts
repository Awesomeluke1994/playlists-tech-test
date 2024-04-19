import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {PlaylistContent} from "../../types/playlist";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgOptimizedImage,
    NgIf,
    MatButton
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent {
  @Input()
  public playlistContent!: PlaylistContent;
  public showInformation: boolean = false;

  public openPlaylistUrl() {
    window.open(this.playlistContent.url, '_blank')
  }

  public hideInfo() {
    this.showInformation = false;
  }

  public showInfo() {
    this.showInformation = true;
  }
}
