import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { TemplateTodoComponent } from './_templates/template-todo/template-todo.component';
import { TemplateTodoFormComponent } from './_templates/template-todo-form/template-todo-form.component';
import { TemplateHeaderComponent } from './_templates/template-header/template-header.component';

import { DragulaModule } from 'ng2-dragula';

@NgModule({
    declarations: [
        AppComponent,
        PageListComponent,
        TemplateTodoComponent,
        TemplateTodoFormComponent,
        TemplateHeaderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DragulaModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
