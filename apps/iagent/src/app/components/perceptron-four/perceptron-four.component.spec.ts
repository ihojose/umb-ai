import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerceptronFourComponent } from './perceptron.component';

describe('PerceptronComponent', () => {
  let component: PerceptronFourComponent;
  let fixture: ComponentFixture<PerceptronFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerceptronFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerceptronFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
