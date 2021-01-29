export interface Card {
    cardNumber: string;
    holder: string;
    expirationDate: Date;
    securityCode: string;
    amount: string;
  }

export interface AppState {
card: Card;
}
