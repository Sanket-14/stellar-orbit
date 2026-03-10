import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankService, Account } from './services/bank.service';
import { HeroComponent } from './components/hero/hero.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Test } from './components/test/test';
import { Counter } from './components/counter/counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, AuthComponent, DashboardComponent, RouterModule, RouterOutlet, FormsModule, Test, Counter],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = "";
  currentUser: Signal<Account | null>;
  showAuth: boolean;
  registrationType: 'customer' | 'staff';

  constructor(private bankService: BankService) {
    this.currentUser = this.bankService.currentUser;
    this.showAuth = false;
    this.registrationType = 'customer';
  }

  scrollTo(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }

  startRegistration(type: 'customer' | 'staff') {
    this.registrationType = type;
    this.showAuth = true;
  }

  onLogin(event: any) {
    // Handling login from hero component
    return "ok";
  }

  onRegistered() {
    this.showAuth = false;
  }
}
