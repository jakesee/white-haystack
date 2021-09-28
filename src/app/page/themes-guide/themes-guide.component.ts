import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/data.service';
import { ITheme } from '@app/interfaces';

@Component({
  selector: 'app-themes-guide',
  templateUrl: './themes-guide.component.html',
  styleUrls: ['./themes-guide.component.scss']
})
export class ThemesGuideComponent implements OnInit {

  currentNav = 'general';

  theme: ITheme = {} as ITheme;

  sample = {
    buttonText: "Book Appointment",
    boxText: "Asian pear dessert parsley farro platter arugula salad hummus ultimate double dark chocolate pomegranate cauliflower avocado dressing drizzle lingonberry winter frosted gingerbread bites."
  };

  constructor(private _dataService: DataService) {
    this.theme = _dataService.appConfig.theme;
  }

  ngOnInit(): void {
  }

  onChange($event: any) {
    this._dataService.setTheme(this.theme);
  }

  get output():string {
    return JSON.stringify(this.theme, undefined, 4);
  }

  showNav(currentNav: string): void {
    this.currentNav = currentNav;
  }
}
