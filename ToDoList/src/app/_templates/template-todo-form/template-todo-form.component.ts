import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {

    private toDo$: ToDo;

    constructor(
        public _dataService: DataService
    ) {
        this.toDo$ = {
            label: undefined,
            status: false
        };
    }

    ngOnInit() {
    }

    // Create new ToDo
    public createToDo(event: any): void {
        this._dataService.postToDo(this.toDo$).subscribe((data: ToDo) => {
            this._dataService.getGlobalData();
            this.toDo$ = {
                label: undefined,
                status: false
            };
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

}
