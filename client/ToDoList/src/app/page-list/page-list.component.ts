import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable, Subject, throwError, Subscription, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToDo } from '../_interface/todo';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {

    public $todos: any;
    public $todosdone: any;

    constructor(
        public _dataService: DataService
    ) {
        this.loadData();
    }

    ngOnInit() {
    }

    public loadData(): void {
        this._dataService.getToDo('status=false').subscribe((data: ToDo[]) => {
            this.$todos = data;
        }, response => {
            console.log('Error');
        });
        this._dataService.getToDo('status=true').subscribe((data: ToDo[]) => {
            this.$todosdone = data;
        }, response => {
            console.log('Error');
        });
    }

    // Update ToDo List
    public update(event: any): void {
        this._dataService.putToDo(event);
    }

    // Create new ToDo
    public create(event: any): void {
        this._dataService.postToDo(event);
    }

}
