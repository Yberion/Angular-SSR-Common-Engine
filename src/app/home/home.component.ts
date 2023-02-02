import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChuckNorrisService } from '../shared/services/chuck-norris.service';
import { ChuckNorrisJoke } from '../shared/services/models/chuck-norris/joke.model';

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
    this.randomChuckNorrisJoke$ = this.chuckNorrisService.getRandomJoke();
    this.randomChuckNorrisJokeProxy$ = this.chuckNorrisService.getRandomJokeProxy();
  }
}
