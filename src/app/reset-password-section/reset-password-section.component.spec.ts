import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordSectionComponent } from './reset-password-section.component';

describe('ResetPasswordSectionComponent', () => {
  let component: ResetPasswordSectionComponent;
  let fixture: ComponentFixture<ResetPasswordSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
