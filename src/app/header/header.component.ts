import { Component, EventEmitter, Output } from "@angular/core";

@Component ({
    selector: 'app-header',
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    constructor() { };
    
    @Output() headerClicked = new EventEmitter<string>(); 
    onHeaderClick(text) {
        console.log(text);
        if (text === "recipes" ) {
            this.headerClicked.emit("Recipes");
        } else if (text === "shopping-list") {
            this.headerClicked.emit("Shopping List")
        }

    }
}