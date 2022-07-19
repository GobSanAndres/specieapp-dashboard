import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCropsComponent } from './edit-crops.component';

describe('EditCropsComponent', () => {
  let component: EditCropsComponent;
  let fixture: ComponentFixture<EditCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
