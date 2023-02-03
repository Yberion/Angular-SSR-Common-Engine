import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ChuckNorrisService } from '../shared/services/chuck-norris.service';
import { ChuckNorrisJoke } from '../shared/models/chuck-norris/joke.model';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}
  
  public randomChuckNorrisJoke$!: Observable<ChuckNorrisJoke>;
  public randomChuckNorrisJokeProxy$!: Observable<ChuckNorrisJoke>;

  ngOnInit(): void {
    this.randomChuckNorrisJoke$ = this.chuckNorrisService.getRandomJoke().pipe(tap((joke) => console.info(`joke: ${joke.value}`)));
    this.randomChuckNorrisJokeProxy$ = this.chuckNorrisService.getRandomJokeProxy().pipe(tap((jokeProxy) => console.info(`joke proxy: ${jokeProxy.value}`)));
  }
}
