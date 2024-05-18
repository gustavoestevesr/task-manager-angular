import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/Task.model';
import { SidebarEnum } from '../enums/SidebarEnum';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly apiUrl: string = 'http://localhost:3000/tasks';
  searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  activatedLinkEmitter: EventEmitter<SidebarEnum> = new EventEmitter<SidebarEnum>();

  constructor(private http: HttpClient) { }

  addTask(newTask: Task): Observable<any> {
    return this.http.post(this.apiUrl, newTask);
  }

  updateTask(newTask: Task): Observable<any> {
    return this.http.put(this.apiUrl + `/${newTask.id}`, newTask);
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.delete(this.apiUrl  + `/${task.id}`)
  }

  getAllTasks(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
