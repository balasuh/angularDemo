import { Directive, ElementRef, HostListener, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit {

  @Input() color1: string = 'lightblue';
  @Input() color2: string = 'orange';

  constructor(private element: ElementRef,
   private renderer: Renderer2,
    ) { }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = this.color1;
    // this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', 'orange');
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.backgroundColor = this.color2;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.backgroundColor = this.color1;
  }

}
