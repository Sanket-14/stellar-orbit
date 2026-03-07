import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService, Card } from '../../services/bank.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() cards: Card[] = [];

  selectedCardId = '';
  merchant = '';
  amount = 0;
  isProcessing = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private bankService: BankService) { }

  isValid() {
    return this.selectedCardId && this.merchant && this.amount > 0 && !this.isProcessing;
  }

  pay() {
    this.isProcessing = true;
    this.message = '';

    // Simulate network delay
    setTimeout(() => {
      const success = this.bankService.processPayment(this.selectedCardId, this.amount, this.merchant);
      this.isProcessing = false;

      if (success) {
        this.message = 'Payment Successful!';
        this.messageType = 'success';
        this.amount = 0;
        this.merchant = '';
      } else {
        this.message = 'Transaction Failed. Insufficient balance or invalid card.';
        this.messageType = 'error';
      }
    }, 1500);
  }
}
