import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarEnum } from '../../enums/SidebarEnum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  activatedLink: SidebarEnum = SidebarEnum.All
  SidebarEnum = SidebarEnum;

  changeActivatedLink(sidebarEnum: SidebarEnum) {
    this.activatedLink = sidebarEnum;
  }
}
