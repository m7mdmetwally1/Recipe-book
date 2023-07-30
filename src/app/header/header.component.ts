import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToggleDirective } from '../shared/toggle.directive';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription, subscribeOn } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onStoreData() {
    this.dataStorage.storeData();
  }

  onFetchData() {
    this.dataStorage.fetchData().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    this.authService.logout();
  }
}
