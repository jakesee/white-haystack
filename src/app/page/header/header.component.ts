import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/auth/authentication.service';
import { User } from '@app/interfaces';
import { DataService } from '@app/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  imgURL: string = 'https://placekitten.com/200/80';
  menuItems: Array<any> = [];

  currentUser: User;
  isHideMenu: boolean = true;

  constructor(private _dataService: DataService, private _auth: AuthenticationService, private _router: Router) {

    let config = this._dataService.config.HeaderComponent;
    this.imgURL = config.imgURL;
    this.menuItems = config.menuItems;
    this.currentUser = null;
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.currentUser = this._auth.currentUser;
      console.log('HeaderComponent: ' + this.currentUser);
    }
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

  onLogOut($event: any) {
    this._auth.logOut();
    this._router.navigate(['/']);
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
