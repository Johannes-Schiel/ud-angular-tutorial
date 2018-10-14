import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTodoFormComponent } from './template-todo-form.component';

describe('TemplateTodoFormComponent', () => {
  let component: TemplateTodoFormComponent;
  let fixture: ComponentFixture<TemplateTodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTodoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
