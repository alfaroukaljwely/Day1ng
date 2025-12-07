import { Component, Input , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-customers',
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
@Input() title!: string;

  @Output() messages = new EventEmitter<string>();

  showMessage() {
    this.messages.emit('Hello from Customers Component');
  }
}
