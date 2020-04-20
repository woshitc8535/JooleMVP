import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparelistComponent } from './comparelist.component';

describe('ComparelistComponent', () => {
  let component: ComparelistComponent;
  let fixture: ComponentFixture<ComparelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
