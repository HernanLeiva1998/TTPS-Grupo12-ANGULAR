import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRequiredMark]',
  standalone: true,
})
export class RequiredMarkDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const currentPlaceholder = element.getAttribute('placeholder');

    if (currentPlaceholder) {
      element.setAttribute('placeholder', currentPlaceholder + ' (*)');
    } else {
      const asteriskElement = this.renderer.createElement('small');
      asteriskElement.textContent = ' (*)';
      asteriskElement.setAttribute('style', 'color: red;');

      this.renderer.appendChild(element, asteriskElement);
    }
  }
}
