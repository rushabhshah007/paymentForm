import { createAction, props } from '@ngrx/store';
import { Card } from './app.model';

export const updateCard = createAction(
  '[ Card ] update',
  props<{ card: Card }>()
);
