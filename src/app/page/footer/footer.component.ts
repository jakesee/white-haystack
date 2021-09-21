import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/auth/authentication.service';
import { DataService } from '@app/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() hasNavigation = true;

  isVisible = false;

  menuItems:Array<any> = [];

  constructor(private _dataService: DataService, private _auth: AuthenticationService) {
    this.menuItems = this._dataService.appConfig.menuItems;
  }

  @HostListener("window:scroll", ['$event']) onScroll($event): void {

    const element = $event.target.documentElement;
    const scrollPos = element.scrollTop;
    const isBottom = element.offsetHeight - scrollPos - window.innerHeight <= 1;
    this.isVisible = this.hasNavigation && (isBottom || scrollPos >= 2);
  }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

}
