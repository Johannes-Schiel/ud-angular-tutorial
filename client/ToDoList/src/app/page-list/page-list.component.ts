import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
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

    ngOnInit() {}

    ngOnDestroy() { this.subs.unsubscribe(); }

    // Function zu laden der Datensätze
    public loadData(): void {
        this.$todosdone = [];
        this.$todos = [];
        this._dataService.getToDo().subscribe((data: ToDo[]) => {
            data.forEach((toDo: ToDo) => {
                if (toDo.status === true) {
                    this.$todosdone.push(toDo);
                } else {
                    this.$todos.push(toDo);
                }
            });
            this.$todos.sort((obj1, obj2) => {
                return obj1.position - obj2.position;
            });
        });
    }

    // Function um die Position der Objekte zu überschreiben
    public position(): void {
        let position = 0;
        this.$todos.forEach((todo: ToDo) => {
            position += 1;
            todo.position = position;
            this._dataService.putToDo(todo).subscribe((data: ToDo) => {});
        });
        this.loadData();
    }

    // Delte ToDo
    public update(event: any): void {
        this.loadData();
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
