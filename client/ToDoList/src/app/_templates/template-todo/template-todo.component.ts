import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

    @Input() toDo$: ToDo;
    @Output() ping: EventEmitter<any> = new EventEmitter<any>();
    public lastKeypress: number;
    public timeStamp: number;

    constructor(
        public _dataService: DataService
    ) {}

    ngOnInit() {}

    // Function to update the Label
    public changeLabel(event?: any): void {
        if ( event.timeStamp - this.lastKeypress > 200 ) {
            this._dataService.putToDo(this.toDo$);
        }
        this.lastKeypress = event.timeStamp;
    }

    // Function
    public changeCheck(event?: any): void {
        this.toDo$.status = !this.toDo$.status;
        this.ping.emit(this.toDo$);
    }

    // Function to Delete this Element
    public deleteToDo(): void {
        this.ping.emit('delete');
        this._dataService.deleteToDo(this.toDo$);
    }

}
