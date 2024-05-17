import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/Task.model';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss',
})
export class ListTasksComponent implements OnInit {
  newTask: string = '';
  tasks: any[] = [];
  today: Date = new Date();

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    const newTaskModel: Task = {
      title: this.newTask,
      completed: false,
      important: false,
    };

    this.tasksService.addTask(newTaskModel).subscribe(() => {
      this.loadTasks(); // Reload tasks to get the updated list
      this.clearInputNewTask();
    });
  }

  markAsImportant(task: Task) {
    const taskModel: Task = {
      ...task,
      important: !task.important,
    };

    this.tasksService.updateTask(taskModel).subscribe(() => {
      this.loadTasks(); // Reload tasks to get the updated list
    });
  }

  markAsCompleted(task: Task) {
    const taskModel: Task = {
      ...task,
      completed: !task.completed,
    };

    this.tasksService.updateTask(taskModel).subscribe(() => {
      this.loadTasks(); // Reload tasks to get the updated list
    });
  }

  clearInputNewTask() {
    this.newTask = '';
  }
}
