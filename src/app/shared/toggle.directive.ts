import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  constructor() {}

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
