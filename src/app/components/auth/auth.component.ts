import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  @Input() registrationType: 'customer' | 'staff' = 'customer';
  @Output() onClose = new EventEmitter<void>();
  @Output() onRegistered = new EventEmitter<void>();

  fullName = '';

  constructor(private bankService: BankService) { }

  register() {
    if (this.fullName.trim()) {
      this.bankService.register(this.fullName, this.registrationType);
      this.onRegistered.emit();
    }
  }
}
