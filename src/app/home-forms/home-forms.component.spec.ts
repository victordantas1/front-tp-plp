import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFormsComponent } from './home-forms.component';

describe('HomeFormsComponent', () => {
  let component: HomeFormsComponent;
  let fixture: ComponentFixture<HomeFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
