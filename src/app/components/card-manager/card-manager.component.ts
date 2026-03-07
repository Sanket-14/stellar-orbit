import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService, Card } from '../../services/bank.service';

@Component({
  selector: 'app-card-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.css']
})
export class CardManagerComponent {
  @Input() accountId!: string;
  @Input() cards: Card[] = [];

  constructor(private bankService: BankService) { }

  issueCard() {
    this.bankService.issueCard(this.accountId, 'virtual');
  }
}
