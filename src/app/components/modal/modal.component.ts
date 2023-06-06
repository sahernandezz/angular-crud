import {Component} from '@angular/core';

import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent<T> {
  display = true;

  constructor(private modalService: ModalService<T>) {
  }

  async close(): Promise<void> {
    this.display = false;
    await this.modalService.close();
  }
}
