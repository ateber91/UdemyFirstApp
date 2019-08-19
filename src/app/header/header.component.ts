import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuth = false;
    private userSub: Subscription;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuth = !!user;
      });
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveData(): void {
        this.dataStorageService.storeRecipes();
    }

    onFetchData(): void {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}
