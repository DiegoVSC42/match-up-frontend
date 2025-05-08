import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent {
  @Input() partida: any;
}
