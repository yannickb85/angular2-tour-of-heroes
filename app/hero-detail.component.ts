import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
	selector: 'my-hero-detail',
	template: `
	  <div *ngIf="hero">
	    <h2>{{hero.name}} details!</h2>
	    <div><label>id: </label>{{hero.id}}</div>
	    <div>
	      <label>name: </label>
	      <input [(ngModel)]="hero.name" placeholder="name"/>
	    </div>
			<button (click)="goBack()">Back</button>
	  </div>
	`,
	styleUrls: [ 'app/hero-detail.component.css']

})
export class HeroDetailComponent implements OnInit {

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.heroService.getHero(id)
				.then(hero => this.hero = hero);
		});
	}

	goBack(): void {
		window.history.back();
	}

	hero: Hero;

}

