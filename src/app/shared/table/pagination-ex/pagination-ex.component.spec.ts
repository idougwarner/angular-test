import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationExComponent } from './pagination-ex.component';

describe('PaginationExComponent', () => {
  let component: PaginationExComponent;
  let fixture: ComponentFixture<PaginationExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
