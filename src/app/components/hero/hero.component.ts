import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Output() onLogin = new EventEmitter<any>();
  @Output() onRegister = new EventEmitter<'customer' | 'staff'>();

  loginName = '';
  loginType: 'customer' | 'staff' = 'customer';

  constructor(private bankService: BankService) { }

  login() {
    if (!this.loginName.trim()) return;

    // Simulate finding account or registering if not exists
    const account = this.bankService.accounts().find(a => a.name === this.loginName);
    if (account) {
      this.bankService.currentUser.set(account);
    } else {
      this.bankService.register(this.loginName, this.loginType);
    }
  }
}
