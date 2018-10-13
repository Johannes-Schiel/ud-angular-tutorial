import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {

    public $todos: any;
    public $todosdone: any;

    constructor() {
        this.$todos = [
            {
                label: 'Website bauen',
                description: 'Beispiel Beschreibung.'
            },
            {
                label: 'E-Mails beantworten',
                description: 'Beispiel Beschreibung.'
            }
        ];
        this.$todosdone = [
            {
                label: 'Design erstellen',
                description: 'Beispiel Beschreibung.'
            }
        ];
    }

    ngOnInit() {
    }

}
