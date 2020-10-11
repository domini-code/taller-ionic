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

  checkToggle(shouldCheck: boolean) {
    this.isDark = shouldCheck;
  }

  toggleDark() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    console.log(this.isDark);
  }

}
