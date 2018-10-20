import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ToDo } from '../_interface/todo';
import { EventPing } from '../_interface/eventping';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit, OnDestroy {

    public $todos: ToDo[];
    public $todosdone: ToDo[];
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

    // Function zu laden der Datensätze
    public loadData(): void {
        console.log(`%cFUNC: loadData()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
        this.$todosdone = [];
        this.$todos = [];
        this._dataService.getToDo().subscribe((data: ToDo[]) => {
            console.log(`%cSUC: Es wurden ${data.length} ToDo Punkte geladen.`, `color: green; font-size: 12px;`);
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
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

    // Function um die Position der Objekte zu überschreiben
    public position(): void {
        console.log(`%cFUNC: position()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
        let position = 0;
        this.$todos.forEach((todo: ToDo) => {
            position += 1;
            todo.position = position;
            this._dataService.putToDo(todo).subscribe((data: ToDo) => {
                console.log(`%cSUC: ${data.label} wurde neu positioniert.`, `color: green; font-size: 12px;`);
            }, error => {
                console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
            });
        });
    }

    // Delte ToDo
    public update(event: EventPing): void {
        console.log(`%cFUNC: update()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
        if ('check' === event.label) {
            console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green; font-size: 12px;`);
            if (!event.object.status) {
                this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
                this.$todos.push(event.object);
            } else {
                this.$todos.splice(this.$todos.indexOf(event.object), 1);
                this.$todosdone.push(event.object);
            }
        }
        if ('delete' === event.label) {
            console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green; font-size: 12px;`);
            if (event.object.status) {
                this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
            } else {
                this.$todos.splice(this.$todos.indexOf(event.object), 1);
            }
        }
        if ('label' === event.label) {
            console.log(`%c"${event.label}-Event" wurde getriggert. `, `color: green; font-size: 12px;`);
            if (event.object.status) {
                this.$todosdone.forEach((toDo: ToDo) => {
                    if (toDo.id === event.object.id) {
                        toDo.label = event.object.label;
                    }
                });
            } else {
                this.$todos.forEach((toDo: ToDo) => {
                    if (toDo.id === event.object.id) {
                        toDo.label = event.object.label;
                    }
                });
            }
        }
    }

    // Create new ToDo
    public create(event: any): void {
        console.log(`%cFUNC: create()`, `color: white; background-color: black; padding 5px; font-size: 16px;`);
        event.position = this.$todos.length + 1;
        this._dataService.postToDo(event).subscribe((data: ToDo) => {
            console.log(`%cSUC: "${data.label}" wurde erfolgreich erstellt.`, `color: green; font-size: 12px;`);
            this.$todos.push(data);
            this.position();
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

}
