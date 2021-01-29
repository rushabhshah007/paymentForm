import { createReducer, on } from '@ngrx/store';
import { Card } from './app.model';
import { updateCard } from './card.action';

const initialState: Card = {
  cardNumber: '123456789012',
  holder: 'Test User',
  expirationDate: new Date('10/10/2010'),
  securityCode: '333',
  amount: '1000'
};

export const cardReducer = createReducer(
  initialState,
  on(updateCard, (state, { card }) => ({
    ...state,
    ...card
  }))
);
