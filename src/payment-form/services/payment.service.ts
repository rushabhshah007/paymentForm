import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../../app/app.model';

type CardPayment = Card & {
  amount: number;
};

@Injectable()
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  public pay(cardPayment: any): Observable<any> {
    // return this.httpClient.post("/payment", cardPayment);
    return of('ok');
  }
}
