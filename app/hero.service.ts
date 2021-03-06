import { Injectable } 		from '@angular/core';
import { Headers, Http, Response } 	from '@angular/http';
import { Observable } 		from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

	private headers = new Headers({'Content-Type: ':'application/json'});

	private heroesUrl = 'app/heroes'; // URL to web api

	constructor(private http: Http) {}

	search(term: string): Observable<Hero[]> {
		return this.http
					.get(`app/heroes/?name=${term}`)
					.map((r: Response) => r.json().data as Hero[]);
	}

	create(name: string): Promise<Hero> {
		return this.http
					.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
						.toPromise()
							.then(res => res.json().data)
								.catch(this.handleError);
  }

	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		let url = `${this.heroesUrl}/${id}`;
		return this.http
				.delete(url, {headers: this.headers})
					.toPromise()
						.then(() => null)
							.catch(this.handleError);
	}

	getHero(id: number): Promise<Hero> {
		return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
	}

	getHeroesSlowly(): Promise<Hero[]> {
	  return new Promise<Hero[]>(resolve =>
	    setTimeout(resolve, 2000)) // delay 2 seconds
	    .then(() => this.getHeroes());
	}

	/**
	 * ********
	 * Helpers
	 * ********
	 */

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
	 
}
