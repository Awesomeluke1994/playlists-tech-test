import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";
import {PlaylistCardComponent} from "./components/playlist-card/playlist-card.component";
import {MatFormField, MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, MatToolbar, PlaylistCardComponent, NgIf, MatInput, FormsModule, MatFormField, ReactiveFormsModule, MatAutocompleteTrigger, MatAutocomplete, MatOption],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
