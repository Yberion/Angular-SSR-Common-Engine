import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChuckNorrisJoke } from "../models/chuck-norris/joke.model";

@Injectable({
    providedIn: 'root'
})
export class ChuckNorrisService {
    private readonly API = 'https://api.chucknorris.io/jokes/random';
    private readonly API_PROXY = '/api/chuck-norris/jokes/random';

    constructor(private httpClient: HttpClient) {}

    public getRandomJoke(): Observable<ChuckNorrisJoke> {
        return this.httpClient.get<ChuckNorrisJoke>(this.API);
    }

    public getRandomJokeProxy(): Observable<ChuckNorrisJoke> {
        return this.httpClient.get<ChuckNorrisJoke>(this.API_PROXY);
    }
}