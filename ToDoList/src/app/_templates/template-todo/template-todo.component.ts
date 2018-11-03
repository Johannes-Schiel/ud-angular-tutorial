import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

    @Input() toDo$: ToDo;
    public lastKeypress: number;
    public timeStamp: number;

    constructor(
        public _dataService: DataService
    ) {}

    ngOnInit() {}

    // Function to update the Label
    public changeLabel(event?: any): void {
        this._dataService.putToDo(this.toDo$).subscribe((data: ToDo) => {
            this._dataService.getGlobalData();
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

    // Function
    public changeCheck(event?: any): void {
        this.toDo$.status = !this.toDo$.status;
        this._dataService.putToDo(this.toDo$).subscribe((data: ToDo) => {
            this._dataService.getGlobalData();
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

    // Function to Delete this Element
    public deleteToDo(): void {
        this._dataService.deleteToDo(this.toDo$).subscribe((data: ToDo) => {
            this._dataService.getGlobalData();
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

}
