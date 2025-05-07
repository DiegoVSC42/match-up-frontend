import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.css'],
})
export class TextModalComponent {
  @Output() textSubmitted = new EventEmitter<string>();
  inputText: string = '';
  isOpen = true;

  submitText() {
    if (this.inputText.trim()) {
      this.textSubmitted.emit(this.inputText);
      this.inputText = '';
    }
  }
}
