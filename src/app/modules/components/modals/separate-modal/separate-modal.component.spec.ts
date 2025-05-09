import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparateModalComponent } from './separate-modal.component';

describe('SeparateModalComponent', () => {
  let component: SeparateModalComponent;
  let fixture: ComponentFixture<SeparateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeparateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
