import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule , RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterModule , NavComponent , FooterComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Day1';
}
