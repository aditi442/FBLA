import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingPatternComponent } from './spending-pattern.component';

describe('SpendingPatternComponent', () => {
  let component: SpendingPatternComponent;
  let fixture: ComponentFixture<SpendingPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingPatternComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpendingPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
