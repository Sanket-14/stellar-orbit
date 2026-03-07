import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    accountType: string;
    joinedDate: string;
    preferences: {
        currency: string;
        notifications: boolean;
        theme: string;
    }
}

export interface Account {
    id: string;
    name: string;
    type: 'customer' | 'staff';
    balance: number;
}

export interface Card {
    id: string;
    accountId: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
    status: 'active' | 'blocked';
    type: 'virtual' | 'physical';
}

export interface Transaction {
    id: string;
    cardId: string;
    amount: number;
    timestamp: Date;
    merchant: string;
}

@Injectable({
    providedIn: 'root'
})
export class BankService {
    accounts = signal<Account[]>([]);
    cards = signal<Card[]>([]);
    transactions = signal<Transaction[]>([]);
    currentUser = signal<Account | null>(null);

    private http = inject(HttpClient);

    getUserProfile(userId: string): Observable<UserProfile> {
        // In a real Spring Boot app, you would call something like:
        // return this.http.get<UserProfile>(`http://localhost:8080/api/users/${userId}`);

        // For this demo, we call our local mock JSON file:
        return this.http.get<UserProfile>('/mock-data/user-profile.json');
    }

    register(name: string, type: 'customer' | 'staff') {
        const newAccount: Account = {
            id: Math.random().toString(36).substring(7),
            name,
            type,
            balance: type === 'customer' ? 1000 : 5000 // Staff get higher initial simulated balance
        };
        this.accounts.update(accs => [...accs, newAccount]);
        this.currentUser.set(newAccount);
        return newAccount;
    }

    issueCard(accountId: string, type: 'virtual' | 'physical') {
        const newCard: Card = {
            id: Math.random().toString(36).substring(7),
            accountId,
            cardNumber: this.generateCardNumber(),
            expiry: '12/28',
            cvv: Math.floor(100 + Math.random() * 900).toString(),
            status: 'active',
            type
        };
        this.cards.update(cards => [...cards, newCard]);
        return newCard;
    }

    processPayment(cardId: string, amount: number, merchant: string) {
        const card = this.cards().find(c => c.id === cardId);
        if (!card) return false;

        const account = this.accounts().find(a => a.id === card.accountId);
        if (!account || account.balance < amount) return false;

        // Update balances
        this.accounts.update(accs => accs.map(a =>
            a.id === account.id ? { ...a, balance: a.balance - amount } : a
        ));

        // Log transaction
        const newTx: Transaction = {
            id: Math.random().toString(36).substring(7),
            cardId,
            amount,
            timestamp: new Date(),
            merchant
        };
        this.transactions.update(txs => [newTx, ...txs]);

        // Sync current user
        if (this.currentUser()?.id === account.id) {
            this.currentUser.set({ ...account, balance: account.balance - amount });
        }

        return true;
    }

    private generateCardNumber() {
        return Array(4).fill(0).map(() => Math.floor(1000 + Math.random() * 9000)).join(' ');
    }

    logout() {
        this.currentUser.set(null);
    }
}
