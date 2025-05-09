import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, TranslateModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() showTeamSize = true;
  @Input() title = '';
  @Input() submitText = '';
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<{ text: string; teamSize?: number }>();

  text = '';
  teamSize?: number;

  close() {
    this.closed.emit();
    this.resetForm();
  }

  submit() {
    if (this.text.trim()) {
      this.submitted.emit({
        text: this.text,
        teamSize: this.showTeamSize ? this.teamSize : undefined,
      });
      this.resetForm();
    }
  }

  private resetForm() {
    this.text = '';
    this.teamSize = undefined;
  }
}
