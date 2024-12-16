import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsumableComponent } from './new-consumable.component';

describe('NewConsumableComponent', () => {
  let component: NewConsumableComponent;
  let fixture: ComponentFixture<NewConsumableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConsumableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConsumableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
