import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[ytRipple]',
})
export class RippleDirective implements OnInit, AfterViewInit {

  constructor(
    private readonly renderer2: Renderer2,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    this.renderer2.setStyle(this.elementRef.nativeElement, 'overflow', 'hidden');
  }

  @HostListener('click', ['$event']) onClick(event: any) {
    this.displayRipple(event);
  }

  private displayRipple(event: any): void {

    const ripple = this.elementRef.nativeElement.getElementsByClassName("yt-ripple")[0];
    if (ripple) {
      this.renderer2.removeChild(this.elementRef.nativeElement, ripple)
    }

    const circle: HTMLSpanElement = this.renderer2.createElement("span");

    const diameter = Math.max(this.elementRef.nativeElement.clientWidth, this.elementRef.nativeElement.clientHeight);
    const radius = diameter / 2;

    this.renderer2.setStyle(circle, 'width', `${diameter}px`);
    this.renderer2.setStyle(circle, 'height', `${diameter}px`);
    this.renderer2.setStyle(circle, 'left', `${event.clientX - (this.elementRef.nativeElement.offsetLeft + radius)}px`);
    this.renderer2.setStyle(circle, 'top', `${event.clientY - (this.elementRef.nativeElement.offsetTop + radius)}px`);
    this.renderer2.addClass(circle, 'yt-ripple');
    this.renderer2.appendChild(this.elementRef.nativeElement, circle);
  }
}
