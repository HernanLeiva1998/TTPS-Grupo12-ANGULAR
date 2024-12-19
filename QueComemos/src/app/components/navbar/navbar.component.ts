import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private tokenService: TokenService) {}

  isLogged(): Boolean {
    return this.tokenService.isLogged();
  }
}
