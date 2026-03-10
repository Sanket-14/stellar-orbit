import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.update(v => v + 1);
  }
  decrement() {
    this.count.update(v => v - 1);
  }

}
