import { AfterViewInit, Component, VERSION, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('header', { read: ViewContainerRef }) viewHeader: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) viewFooter: ViewContainerRef;

  name = 'Angular ' + VERSION.major;

  constructor(private _dataService: DataService) {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loadComponents();
    }, 1);
  }

  private _loadComponents() {
    if (this.viewHeader && this.viewFooter) {
      console.log(this._dataService.appConfig.footer, this.viewFooter);
      this._dataService.loadComponent(this.viewHeader, this._dataService.appConfig.header.component);
      this._dataService.loadComponent(this.viewFooter, this._dataService.appConfig.footer.component);
    }
  }
}
