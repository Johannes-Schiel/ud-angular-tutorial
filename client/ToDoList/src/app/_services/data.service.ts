import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError, Subscription, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ToDo } from '../_interface/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private serverUrl = 'http://localhost:3000';

    constructor(
        private _http: HttpClient
    ) {
    }

    // POST
    public postToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders ({
                'Content-Type': 'application/json'
            })
        };
        return this._http.post<ToDo>(`${this.serverUrl}/todo`, object, httpOptions );
    }

    // GET
    public getToDo(query?: string): Observable<ToDo[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.get<ToDo[]>(`${this.serverUrl}/todo?${query}`, httpOptions);
    }

    // DELETE
    public deleteToDo(object: ToDo) {
        return this._http.delete(`${this.serverUrl}/todo/${object.id}`);
    }

    // PUT
    public putToDo(object: ToDo) {
        return this._http.put(`${this.serverUrl}/todo/${object.id}`, object);
    }

    // PUT
    public putAllToDo(object: ToDo): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.put<any>(`${this.serverUrl}/`, object, httpOptions);
    }

}
