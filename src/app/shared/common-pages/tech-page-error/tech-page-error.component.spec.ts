import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPageErrorComponent } from './tech-page-error.component';

describe('TechPageErrorComponent', () => {
  let component: TechPageErrorComponent;
  let fixture: ComponentFixture<TechPageErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechPageErrorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechPageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
