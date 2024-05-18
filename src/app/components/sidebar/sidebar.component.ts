import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidebarEnum } from '../../enums/SidebarEnum';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  activatedLink: SidebarEnum = SidebarEnum.All;
  SidebarEnum = SidebarEnum;
  tasksService = inject(TasksService);

  changeActivatedLink(sidebarEnum: SidebarEnum) {
    this.activatedLink = sidebarEnum;
    this.emitActivatedLink();
  }

  emitActivatedLink() {
    this.tasksService.activatedLinkEmitter.emit(this.activatedLink);
  }
}
