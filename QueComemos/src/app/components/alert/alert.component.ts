import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe((message) => {
      this.message = message;
    });
  }

  closeAlert() {
    this.message = '';
  }
}
