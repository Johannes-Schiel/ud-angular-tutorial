import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable, Subject, throwError, Subscription, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToDo } from '../_interface/todo';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {

    public $todos: any;
    public $todosdone: any;
    public toDoDoneShow: boolean;
    public toDoShow: boolean;
    public subs = new Subscription();

    constructor(
        public _dataService: DataService,
        private _dragulaService: DragulaService
    ) {
        this.$todos = [];
        this.$todosdone = [];
        this.toDoDoneShow = false;
        this.toDoShow = true;
        this.loadData();

        this._dragulaService.createGroup('todos', {
            removeOnSpill: true
        });

        this.subs.add(_dragulaService.drop('todos')
            .subscribe(({ el }) => {
                this.position();
            })
        );

    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    public loadData(): void {
        this._dataService.getToDo('status=false').subscribe((data: ToDo[]) => {
            this.$todos = data;
        });
        this._dataService.getToDo('status=true').subscribe((data: ToDo[]) => {
            this.$todosdone = data;
        });
    }

    public position(): void {
        let position = 0;
        this.$todos.forEach((todo: ToDo) => {
            position += 1;
            todo.position = position;
        }); 
        const toDos = this.$todos.concat(this.$todosdone);
        this._dataService.putAllToDo(toDos).subscribe((data: any) => {
        });
    }

    // Delte ToDo
    public update(event: any): void {
        this.loadData();
        this.position();
    }

    // Create new ToDo
    public create(event: any): void {
        event.position = this.$todos.length + 1;
        this._dataService.postToDo(event).subscribe((data: ToDo) => {
            this.$todos.push(data);
            this.position();
        });
    }

}
