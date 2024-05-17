import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  addTask(newTask: Task): Observable<any> {
    return this.http.post(this.apiUrl, newTask);
  }

  updateTask(newTask: Task): Observable<any> {
    console.warn(newTask)
    return this.http.put(this.apiUrl + `/${newTask.id}`, newTask);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(this.apiUrl)
  }

  getAllTasks(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
