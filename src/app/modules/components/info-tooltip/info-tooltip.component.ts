import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-info-tooltip',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.scss',
})
export class InfoTooltipComponent {
  @Input() text: string = '';
  @Input() description: string = '';
}
