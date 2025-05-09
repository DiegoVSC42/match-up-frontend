import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-player-modal',
  standalone: true,
  templateUrl: './edit-player-modal.component.html',
  styleUrls: ['./edit-player-modal.component.scss'],
})
export class EditPlayerModalComponent {
  @Input() playerName = '';
  @Input() isNewPlayer = false;
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  newName = '';

  ngOnInit() {
    this.newName = this.playerName;
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newName = target.value;
  }

  confirmEdit() {
    if (this.newName.trim()) {
      this.confirm.emit(this.newName.trim());
    }
  }

  cancelEdit() {
    this.cancel.emit();
  }
}
