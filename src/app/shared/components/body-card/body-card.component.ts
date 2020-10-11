import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-body-card',
  templateUrl: './body-card.component.html',
  styleUrls: ['./body-card.component.scss'],
})
export class BodyCardComponent {
  @Input() title: string;
  @Input() subtitle: string;
}
