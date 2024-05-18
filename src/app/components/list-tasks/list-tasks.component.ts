import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarEnum } from '../../enums/SidebarEnum';
import { Task } from '../../models/Task.model';
import { TasksService } from '../../services/tasks.service';

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

  tasksService = inject(TasksService);

  ngOnInit(): void {
    this.loadTasks();

    // Cópia das tarefas originais
    const originalTasks = [...this.tasks];

    this.tasksService.searchEmitter.subscribe((searchTerm: string) => {
      if (searchTerm) {
        const normalizedSearchTerm = searchTerm.toLowerCase();
        this.tasks = this.tasks.filter(
          (t: Task) => t.title.toLowerCase() === normalizedSearchTerm
        );
      } else {
        this.loadTasks();
      }
    });

    this.tasksService.activatedLinkEmitter.subscribe(
      (activatedLink: SidebarEnum) => {
        if (activatedLink === SidebarEnum.All) {
          this.loadTasks();
        } else if (activatedLink === SidebarEnum.Important) {
          this.tasks = this.tasks.filter((t: Task) => t.important === true);
        } else if (activatedLink === SidebarEnum.Completed) {
          this.tasks = this.tasks.filter((t: Task) => t.completed === true);
        }
      }
    );
  }

  loadTasks() {
    this.tasksService.getAllTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (this.newTask.length === 0) {
      return;
    }

    const newTaskModel: Task = {
      title: this.newTask,
      disabled: true,
      completed: false,
      important: false,
    };

    this.tasksService.addTask(newTaskModel).subscribe(() => {
      this.loadTasks(); // Reload tasks to get the updated list
      this.clearInputNewTask();
    });
  }

  editTask(task: Task) {
   const taskModel: Task = {
      ...task,
      disabled: !task.disabled,
    };

    this.tasksService.updateTask(taskModel).subscribe(() => {
      this.loadTasks(); // Reload tasks to get the updated list
    });
  }
  
  deleteTask(task: Task) {
    if (task.id) {
      const res = window.confirm('Do you want to delete it?')
      if (res) {
        this.tasksService.deleteTask(task).subscribe(() => {
          this.loadTasks(); // Reload tasks to get the updated list
        });
      }
    }
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
