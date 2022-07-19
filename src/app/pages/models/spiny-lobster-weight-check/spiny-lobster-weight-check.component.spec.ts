import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinyLobsterWeightCheckComponent } from './spiny-lobster-weight-check.component';

describe('SpinyLobsterWeightCheckComponent', () => {
  let component: SpinyLobsterWeightCheckComponent;
  let fixture: ComponentFixture<SpinyLobsterWeightCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinyLobsterWeightCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinyLobsterWeightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
