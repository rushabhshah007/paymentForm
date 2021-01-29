import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Card } from '../app.model';
import { cardSelector } from '../card.selector';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  public card$: Observable<Card>;
  constructor(store: Store<AppState>) {
    this.card$ = store.select(cardSelector);
  }
}
