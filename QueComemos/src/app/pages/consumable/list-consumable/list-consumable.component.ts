import { Component, OnInit } from '@angular/core';
import { GenericSpinnerComponent } from '../../../components/generic-spinner/generic-spinner.component';
import { Consumable } from '../../../models/consumable';
import { ConsumableService } from '../../../services/consumable/consumable.service';
import { AlertService } from '../../../services/alert/alert.service';
import { PageComponent } from '../../../components/pagination/page/page.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-consumable',
  standalone: true,
  imports: [CommonModule, GenericSpinnerComponent, PaginationComponent],
  templateUrl: './list-consumable.component.html',
  styleUrl: './list-consumable.component.css',
})
export class ListConsumableComponent
  extends PageComponent<Consumable>
  implements OnInit
{
  consumables: Consumable[];
  isLoading: boolean;
  isListEmpty: boolean;

  constructor(
    private consumableService: ConsumableService,
    private readonly router: Router,
    override alertService: AlertService
  ) {
    super(alertService);
    this.consumables = [];
    this.isLoading = true;
    this.isListEmpty = false;
  }

  ngOnInit(): void {
    this.fetchPageData();
  }

  fetchPageData(pageNumber: number = 0): void {
    this.isLoading = true;
    this.consumableService.getPage(pageNumber).subscribe((data) => {
      this.consumables = data.content;
      this.page = data;
      this.isListEmpty = this.consumables.length === 0;
      this.isLoading = false;
    });
  }

  public goToNewConsumable() {
    this.router.navigate(['consumable/create']);
  }
}
