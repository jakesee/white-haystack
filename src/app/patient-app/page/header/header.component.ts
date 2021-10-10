import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { User } from '@app/interfaces';
import { DataService } from '@app/data.service';
import { PageBase } from '../page-base';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends PageBase implements OnInit {

  @Input() hasNavigation = true;

  logoUrl: string = 'https://placekitten.com/200/80';
  menuItems: Array<any> = [];
  currentUser: User;
  isHideMenu: boolean = true;

  returnUrl: string = '/';

  constructor(protected _dataService: DataService, private _auth: AuthenticationService, private _router: Router) {
    super(_dataService);

    this.logoUrl = this._dataService.appConfig.logoUrl;
    this.menuItems = this._dataService.appConfig.menuItems;
    this.currentUser = null;
    this.returnUrl = _router.routerState.snapshot.url;
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.currentUser = this._auth.currentUser;
    }
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

  onLogOut($event: any) {
    this._auth.logOut();
    this._router.navigate(['/patient']);
  }

  onToggleMenu($event: any) {
    this.isHideMenu = !this.isHideMenu;
    return false;
  }

  onCloseMobileDownloadBar($event: any) {
    this._dataService.isShowMobileDownloadBar = false;
    return false;
  }

  get isShowMobileDownloadBar(): boolean {
    return this._dataService.isShowMobileDownloadBar;
  }
}
