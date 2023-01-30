import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPlacementComponent } from './field-placement.component';

describe('FieldPlacementComponent', () => {
  let component: FieldPlacementComponent;
  let fixture: ComponentFixture<FieldPlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldPlacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
