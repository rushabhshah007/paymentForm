import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.model';
import { updateCard } from '../../app/card.action';
import { PaymentService } from './../services/payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  public paymentCard: FormGroup;
  public hide = true;
  public errorStateMatcher = new CardErrorStateMatcher();

  constructor(
    private paymentService: PaymentService,
    private store: Store<AppState>,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.paymentCard = new FormGroup({
      cardNumber: new FormControl('', [Validators.required]),
      holder: new FormControl('', Validators.required),
      expirationDate: new FormControl('', [
        Validators.required,
        this.dateValidator
      ]),
      securityCode: new FormControl('', Validators.pattern('^[0-9]{3}$')),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });
  }

  public dateValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (new Date() > new Date(value)) {
      return {
        date: 'Improper Date'
      };
    }
  }

  public navigateHome(): void {
    this.router.navigate(['']);
  }

  public submit(): void {
    const cardPaymentDetails = this.paymentCard.value;
    this.paymentService.pay(cardPaymentDetails).subscribe(
      (data: any) => {
        const newCard = {
          cardNumber: cardPaymentDetails.cardNumber,
          holder: cardPaymentDetails.holder,
          expirationDate: cardPaymentDetails.expirationDate,
          securityCode: cardPaymentDetails.securityCode,
          amount: cardPaymentDetails.amount
        };
        this.store.dispatch(updateCard({ card: newCard }));
        this.toastrService.success('Payment successful');
        this.reset();
      },
      (error: any) => this.toastrService.error('Payment Failed')
    );
  }

  public reset(): void {
    this.paymentCard.reset();
  }

}

class CardErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
