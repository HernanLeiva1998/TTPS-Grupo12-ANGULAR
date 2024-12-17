import { Component } from '@angular/core';
import { ConsumableService } from '../../services/consumable/consumable.service';
import { UserService } from '../../services/user/user.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  users: any[] = [];  // Para almacenar los consumibles

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;  // Asume que los datos son un array
        console.log(this.users);
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
}
