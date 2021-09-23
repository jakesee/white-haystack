import { DataService } from "@app/data.service";
import { IPageStyle } from "@app/interfaces";

export class PageBase {
    constructor(protected _dataService: DataService) { }

    get pageStyle(): IPageStyle {
        return this._dataService.appConfig.pageStyle;
    }
}
