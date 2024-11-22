import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FooterComponent } from "../../common/footer/footer.component";

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent {

}
