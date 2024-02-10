import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BaseIconButton } from './base-icon-button.component';
import { ButtonSize, ButtonType } from './button.types';

@Component({
  selector: 'dk-button',
  standalone: true,
  imports: [],
  styleUrl: './button.component.scss',
  template: `
    <button
      #button
      [id]="buttonId"
      [disabled]="disabled"
      (click)="emitClickEvent($event)"
      (focus)="focus.emit($event)"
      (blur)="blur.emit($event)"
    ></button>
  `,
})
export class ButtonComponent extends BaseIconButton implements AfterViewInit {
  /**
   * Pass global classes to icon button
   */
  @Input() set buttonNgClass(obj: { [key: string]: boolean }) {
    this.classList = Object.assign({ 'dk-btn--disabled': this.disabled }, obj);
  }

  getButtonNgClass() {
    return this.classList;
  }

  /**
   * @param obj: { [key: string]: string }
   *
   */
  @Input() set buttonAttributes(obj: { [key: string]: string }) {
    if (this.button) {
      Object.keys(this.attributeList).forEach((key: string) => {
        this.renderer.removeAttribute(this.button.nativeElement, key);
      });
      Object.keys(obj).forEach((key: string) => {
        this.renderer.setAttribute(this.button.nativeElement, key, obj[key]);
      });
    }

    this.attributeList = obj;
  }

  get buttonAttributes() {
    return this.buttonAttributes;
  }

  static iconButtonCounter = 0;

  @ViewChild('button') button!: ElementRef;
  /**
   * Override id
   */
  @Input() buttonId = `btn-${ButtonComponent.iconButtonCounter++}`;
  /**
   * Button type
   */
  @Input() kind: ButtonType = 'primary';
  /**
   * Button size
   */
  @Input() size: ButtonSize = 'lg';
  /**
   * Default 'button' type
   */
  @Input() type: string = 'button';
  /**
   * Set to 'true' to disable button
   */
  @Input() disabled = false;

  /**#button
   * Common button events
   */
  @Output() click = new EventEmitter<Event>();
  @Output() focus = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();

  private classList: { [key: string]: boolean } = {};
  private attributeList: { [key: string]: string } = {};

  constructor(private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit(): void {
    // Set attributes once element is found
    this.buttonAttributes = this.attributeList;
  }
  /**
   * Stop propagation of click event
   * @param event
   * @param element
   */
  emitClickEvent(event: Event, element: 'button' = 'button') {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit(event);
  }
}
