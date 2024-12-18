import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu/menu.service';
import { Menu } from '../../../models/menu';
import { GenericSpinnerComponent } from '../../../components/generic-spinner/generic-spinner.component';
import { AlertService } from '../../../services/alert/alert.service';
import { PageComponent } from '../../../components/pagination/page/page.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-menu',
  standalone: true,
  imports: [CommonModule, GenericSpinnerComponent, PaginationComponent, RouterModule],
  templateUrl: './list-menu.component.html',
  styleUrl: './list-menu.component.css'
})
export class ListMenuComponent
  extends PageComponent<Menu>
  implements OnInit
{
  menus: Menu[];
  isLoading: boolean;
  isListEmpty: boolean;

  constructor(
    private menuService: MenuService,
    private readonly router: Router,
    override alertService: AlertService
  ) {
    super(alertService);
    this.menus = [];
    this.isLoading = true;
    this.isListEmpty = false;
  }

  ngOnInit(): void {
    this.fetchPageData();
  }

  fetchPageData(pageNumber: number = 0): void {
    this.isLoading = true;
    this.menuService.getPage(pageNumber).subscribe((data) => {
      this.menus = data.content;
      this.page = data;
      this.isListEmpty = this.menus.length === 0;
      this.isLoading = false;
    });
  }

  public goToNewMenu() {
    this.router.navigate(['menu/create']);
  }

  public editMenu(id?: number) {
    this.router.navigate(['menu/edit', id!!]);
  }

  public deleteMenu(id?: number){
    this.menuService.delete(id ?? 0).subscribe({
      next: () => {
        this.fetchPageData(this.page.page);
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

}
