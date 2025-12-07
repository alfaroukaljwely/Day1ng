import { Component, Input , Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
@Input() title!: string;

  @Output() messages = new EventEmitter<string>();
  showMessage() {
    this.messages.emit('Hello from Users Component');
  }
}
