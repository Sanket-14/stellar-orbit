import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.html',
  styleUrl: './todo.css',
})
export class Todo {
  // todos: string[] = [];
  todos = new Set<string>();

  addTodo(todo: string) {
    this.todos.add(todo);
  }

  removeTodo(todo: string) {
    this.todos.delete(todo);
  }
}
