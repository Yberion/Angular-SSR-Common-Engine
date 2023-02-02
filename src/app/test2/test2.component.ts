import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChuckNorrisService } from '../shared/services/chuck-norris.service';
import { ChuckNorrisJoke } from '../shared/services/models/chuck-norris/joke.model';

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
    this.randomChuckNorrisJoke$ = this.chuckNorrisService.getRandomJoke();
    this.randomChuckNorrisJokeProxy$ = this.chuckNorrisService.getRandomJokeProxy();
  }
}
