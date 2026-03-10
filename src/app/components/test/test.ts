import { Component, input, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  imports: [FormsModule],
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  name = signal("");
  message = input('message testing');

}
