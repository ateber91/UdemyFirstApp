import { element } from 'protractor';
import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  private btnToggle = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.removeClass(this.elRef.nativeElement, 'open');
  }

  @HostListener('click', ['$event.target']) onClick() {
    this.btnToggle = !this.btnToggle;
    if (this.btnToggle) {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');
    }
  }
}
