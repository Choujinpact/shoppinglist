import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemFormComponent } from './AddItemFormComponent';

describe('AddItemForm', () => {
  let component: AddItemFormComponent;
  let fixture: ComponentFixture<AddItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
