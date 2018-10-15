import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        return this._http.post<ToDo>(`${this.serverUrl}/todo`, object, httpOptions);
    }

    // GET
    public getToDo(): Observable<ToDo[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.get<ToDo[]>(`${this.serverUrl}/todo`, httpOptions);
    }

    // DELETE
    public deleteToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.delete<ToDo>(`${this.serverUrl}/todo/${object.id}`, httpOptions);
    }

    // PUT
    public putToDo(object: ToDo): Observable<ToDo> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this._http.put<ToDo>(`${this.serverUrl}/todo/${object.id}`, object, httpOptions);
    }

}
