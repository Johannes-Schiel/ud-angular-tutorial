import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTodoComponent } from './template-todo.component';

describe('TemplateTodoComponent', () => {
  let component: TemplateTodoComponent;
  let fixture: ComponentFixture<TemplateTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
