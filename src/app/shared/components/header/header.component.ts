import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDark = true;
  toggle = document.querySelector('#themeToggle');
  prefersDark: MediaQueryList;

  constructor() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = !this.prefersDark.matches;
  }

  toggleDark() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
  }

}
