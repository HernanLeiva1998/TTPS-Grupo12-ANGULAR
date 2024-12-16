import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsumableComponent } from './list-consumable.component';

describe('ListConsumableComponent', () => {
  let component: ListConsumableComponent;
  let fixture: ComponentFixture<ListConsumableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsumableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
