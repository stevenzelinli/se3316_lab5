import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollComponent } from './create-coll.component';

describe('CreateCollComponent', () => {
  let component: CreateCollComponent;
  let fixture: ComponentFixture<CreateCollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
