import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChuckNorrisService } from '../shared/services/chuck-norris.service';
import { ChuckNorrisJoke } from '../shared/models/chuck-norris/joke.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}
  
  public randomChuckNorrisJoke$!: Observable<ChuckNorrisJoke>;
  public randomChuckNorrisJokeProxy$!: Observable<ChuckNorrisJoke>;

  ngOnInit(): void {
    this.randomChuckNorrisJoke$ = this.chuckNorrisService.getRandomJoke().pipe(tap((joke) => console.info(`joke: ${joke.value}`)));
    this.randomChuckNorrisJokeProxy$ = this.chuckNorrisService.getRandomJokeProxy().pipe(tap((jokeProxy) => console.info(`joke proxy: ${jokeProxy.value}`)));
  }
}
