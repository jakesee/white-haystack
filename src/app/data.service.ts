import { Injectable, Type } from '@angular/core';
import { CollectPersonalInfoFormComponent } from './form/collect-personal-info-form/collect-personal-info-form.component';
import { ConsultNowComponent } from './sections/consult-now/consult-now.component';
import { TriageFormComponent } from './form/triage-form/triage-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyFormComponent } from './form/emergency-form/emergency-form.component';
import { SymptomsSectionComponent } from './sections/symptoms-section/symptoms-section.component';
import { OnetwothreeSectionComponent } from './sections/onetwothree-section/onetwothree-section.component';
import { BannerSectionComponent } from './sections/banner-section/banner-section.component';
import { NeedAssistanceSectionComponent } from './sections/need-assistance-section/need-assistance-section.component';
import { NextAppointmentInfoFormComponent } from './form/next-appointment-info-form/next-appointment-info-form.component';
import { RequestAppointmentFormComponent } from './form/request-appointment-form/request-appointment-form.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TitleBarSectionComponent } from './sections/title-bar-section/title-bar-section.component';
import { ProviderEligibilityFormComponent } from './form/provider-eligibility-form/provider-eligibility-form.component';
import { SubProvidersSectionComponent } from './sections/sub-providers-section/sub-providers-section.component';
import * as _ from 'lodash';
import { IAppConfig } from './interfaces';
import { MyDoc as Partner } from 'src/partner/theme-mydoc';
import Database from '../assets/database.json';

export const REGISTRY = new Map<string, Type<any>>();
// Sections
REGISTRY.set("ConsultNowComponent", ConsultNowComponent);
REGISTRY.set("SymptomsSectionComponent", SymptomsSectionComponent);
REGISTRY.set("OnetwothreeSectionComponent", OnetwothreeSectionComponent);
REGISTRY.set("BannerSectionComponent", BannerSectionComponent);
REGISTRY.set("NeedAssistanceSectionComponent", NeedAssistanceSectionComponent);
REGISTRY.set("TitleBarSectionComponent", TitleBarSectionComponent);
REGISTRY.set("SubProvidersSectionComponent", SubProvidersSectionComponent);

// Forms
REGISTRY.set("ProviderEligibilityFormComponent", ProviderEligibilityFormComponent);
REGISTRY.set("TriageFormComponent", TriageFormComponent);
REGISTRY.set("CollectPersonalInfoFormComponent", CollectPersonalInfoFormComponent);
REGISTRY.set("EmergencyFormComponent", EmergencyFormComponent);
REGISTRY.set("NextAppointmentInfoFormComponent", NextAppointmentInfoFormComponent);
REGISTRY.set("RequestAppointmentFormComponent", RequestAppointmentFormComponent);

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // store services
  appConfig: IAppConfig;
  state: Array<any> = [];

  isShowMobileDownloadBar: boolean = true;

  constructor(private _router: Router, private _http: HttpClient, private _route: ActivatedRoute) {
    this.init(Database, Partner);
  }

  resolveComponent(component: string): Type<any> {
    return REGISTRY.get(component);
  }

  getProvider(id: number): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/provider`, { params: { id: id } });
  }

  getProvidersByParent(id: number) {
    return this._getProviders().pipe(map((val) => {
      val.data = _.filter(val.data, (p) => p.parentId == id);
      return val;
    }));
  }

  getProviders():Observable<any> {
    return this._getProviders().pipe(map((val) => {
      val.data = _.filter(val.data, (p) => p.parentId == -1);
      return val;
    }));
  }

  init(database: any, appConfig: any) {
    // store database in local storage
    localStorage.setItem('database', JSON.stringify(database));

    this.appConfig = appConfig;
    this._setTheme(appConfig.theme);
  }

  private _setTheme(theme):void {
    Object.keys(theme).forEach((prop) => {
      document.documentElement.style.setProperty(prop, theme[prop]);
    });
  }

  private _getProviders():Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/providers`);
  }
}
