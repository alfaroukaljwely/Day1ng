import { Component , EventEmitter} from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-test',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  title = 'Hello from parent Test Component';
  messageFromChild = '';
  onActivate(event: any) {
    if ('title' in event) {
      event.title = this.title;
    }
    if (event.messages instanceof EventEmitter) {
      event.messages.subscribe((msg: string) => {
        this.messageFromChild = msg;
      });
    }

  }
}
