import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { ToDo } from '../_interface/todo';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {

    public toDoDoneShow: boolean;
    public toDoShow: boolean;
    public subs = new Subscription();

    constructor(
        public _dataService: DataService,
        private _dragulaService: DragulaService
    ) {
        this.toDoDoneShow = false;
        this.toDoShow = true;

        this._dragulaService.createGroup('todos', {
            removeOnSpill: false,
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });

        this.subs.add(_dragulaService.drop('todos')
            .subscribe(({ el }) => {
                this.position();
            })
        );

    }

    // #######################################################
    // #######################################################
    // #######################################################
    // Lifecycle Functions Angular

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    // #######################################################
    // #######################################################
    // #######################################################
    // Interface Functions Angular

    // Function um die Position der Objekte zu überschreiben
    public position(): void {
        let position = 0;
        this._dataService.$todos.subscribe((todos: ToDo[]) => {
            todos.forEach((todo: ToDo) => {
                position += 1;
                todo.position = position;
                this._dataService.putToDo(todo).subscribe((data: ToDo) => {
                }, error => {
                    console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
                });
            });
        });
    }

}
