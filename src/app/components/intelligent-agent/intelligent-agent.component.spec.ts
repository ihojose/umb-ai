import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntelligentAgentComponent } from './intelligent-agent.component';

describe('IntelligentAgentComponent', () => {
  let component: IntelligentAgentComponent;
  let fixture: ComponentFixture<IntelligentAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntelligentAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntelligentAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
