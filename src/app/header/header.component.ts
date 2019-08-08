import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService) { }

    @Output() headerClicked = new EventEmitter<string>();
    onHeaderClick(text) {
        console.log(text);
        if (text === 'recipes') {
            this.headerClicked.emit('Recipes');
        } else if (text === 'shopping-list') {
            this.headerClicked.emit('Shopping List');
        }
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}
