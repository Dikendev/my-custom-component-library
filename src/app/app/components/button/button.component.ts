import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { BaseIconButton } from './base-icon-button.component';
import { ButtonSize } from './button.types';

@Component({
  selector: 'dk-button',
  standalone: true,
  imports: [],
  styleUrl: './button.component.scss',
  template: ` <button #button [id]="buttonId" [size]="size"></button> `,
})
export class ButtonComponent extends BaseIconButton implements AfterViewInit {
  static iconButtonCounter = 0;

  @ViewChild('button') button: ElementRef;

  @Input() size: ButtonSize = 'lg';
}
