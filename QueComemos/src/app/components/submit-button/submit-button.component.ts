import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  @Input() isLoading: Boolean = false;
  @Input() isFormInvalid: Boolean = false;
  @Input() text: string = '';

  constructor() {}
}
