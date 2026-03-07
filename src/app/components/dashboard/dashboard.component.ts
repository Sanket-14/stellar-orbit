import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService, Account, Card, Transaction } from '../../services/bank.service';
import { CardManagerComponent } from '../card-manager/card-manager.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardManagerComponent, PaymentComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: Signal<Account | null>;
  userCards: Signal<Card[]>;
  recentTransactions: Signal<Transaction[]>;

  constructor(private bankService: BankService) {
    this.user = this.bankService.currentUser;

    this.userCards = computed(() =>
      this.bankService.cards().filter(c => c.accountId === this.user()?.id)
    );

    this.recentTransactions = computed(() => {
      const cardIds = this.userCards().map(c => c.id);
      return this.bankService.transactions().filter(t => cardIds.includes(t.cardId));
    });
  }

  logout() {
    this.bankService.logout();
  }
}
