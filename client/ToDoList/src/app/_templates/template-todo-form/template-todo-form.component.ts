import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {

    @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();
    private toDo$: ToDo;

    constructor() {
        this.toDo$ = {
            label: undefined,
            status: false
        };
    }

    ngOnInit() {
    }


    public createToDo(event?: any): void {
        this.ping.emit(this.toDo$);
        this.toDo$ = {
            label: undefined,
            status: false
        };
    }

}
