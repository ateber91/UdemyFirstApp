import { Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit{
    constructor(private elRef: ElementRef) {

    }
    ngOnInit() {
        this.elRef.nativeElement.innerHTML = "Ali was here!";
    }
}