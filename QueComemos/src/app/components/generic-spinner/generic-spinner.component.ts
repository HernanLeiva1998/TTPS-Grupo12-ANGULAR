import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-spinner.component.html',
  styleUrl: './generic-spinner.component.css',
})
export class GenericSpinnerComponent {
  @Input() isLoading: boolean = false;
}
