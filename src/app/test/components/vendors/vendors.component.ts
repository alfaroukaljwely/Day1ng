import { Component, Input , Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-vendors',
  imports: [],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
@Input() title!: string;

  @Output() messages = new EventEmitter<string>();

  showMessage() {
    this.messages.emit('Hello from Vendors Component');
  }
}
