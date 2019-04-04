import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {

    }

  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';
  @Input() defaultColor: string;
  @Input() highlightColor: string;

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') moseover() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'red');
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'transparent')
    this.backgroundColor = this.defaultColor;
  }


}
