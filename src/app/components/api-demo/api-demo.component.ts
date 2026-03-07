import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankService, UserProfile } from '../../services/bank.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-api-demo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './api-demo.component.html',
    styleUrl: './api-demo.component.css'
})
export class ApiDemoComponent {
    private bankService = inject(BankService);

    userId = signal<string>('');
    userProfile = signal<UserProfile | null>(null);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    fetchProfile() {
        if (!this.userId().trim()) {
            this.error.set('Please enter a User ID');
            return;
        }

        this.loading.set(true);
        this.error.set(null);
        this.userProfile.set(null);

        // Demonstration of calling the mock REST API
        this.bankService.getUserProfile(this.userId())
            .pipe(
                finalize(() => this.loading.set(false))
            )
            .subscribe({
                next: (profile) => {
                    this.userProfile.set(profile);
                    console.log('Received profile:', profile);
                },
                error: (err) => {
                    this.error.set('Failed to fetch user profile. Please try again.');
                    console.error('API Error:', err);
                }
            });
    }
}
