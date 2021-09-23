import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
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
import { IAppConfig } from './interfaces';
import { Database } from '../assets/database';
import { MedicalProfileFormComponent } from './form/medical-profile-form/medical-profile-form.component';
import { FooterComponent } from './page/footer/footer.component';
import { HeaderComponent } from './page/header/header.component';
import { MyDoc as Partner } from 'src/partner/theme-mydoc';
//import { Daiichi as Partner } from 'src/partner/theme-daiichi';
//import { Bowtie as Partner } from 'src/partner/theme-bowtie';
import * as _ from 'lodash';
import { RecentFeedsSectionComponent } from './sections/recent-feeds-section/recent-feeds-section.component';
import { RecentProvidersSectionComponent } from './sections/recent-providers-section/recent-providers-section.component';
import { CategorySectionComponent } from './sections/category-section/category-section.component';

export const REGISTRY = new Map<string, Type<any>>();
// Sections
REGISTRY.set("HeaderComponent", HeaderComponent);
REGISTRY.set("FooterComponent", FooterComponent);
REGISTRY.set("ConsultNowComponent", ConsultNowComponent);
REGISTRY.set("SymptomsSectionComponent", SymptomsSectionComponent);
REGISTRY.set("OnetwothreeSectionComponent", OnetwothreeSectionComponent);
REGISTRY.set("BannerSectionComponent", BannerSectionComponent);
REGISTRY.set("NeedAssistanceSectionComponent", NeedAssistanceSectionComponent);
REGISTRY.set("TitleBarSectionComponent", TitleBarSectionComponent);
REGISTRY.set("SubProvidersSectionComponent", SubProvidersSectionComponent);
REGISTRY.set("RecentFeedsSectionComponent", RecentFeedsSectionComponent);
REGISTRY.set("RecentProvidersSectionComponent", RecentProvidersSectionComponent);
REGISTRY.set("CategorySectionComponent", CategorySectionComponent);


// Forms
REGISTRY.set("ProviderEligibilityFormComponent", ProviderEligibilityFormComponent);
REGISTRY.set("TriageFormComponent", TriageFormComponent);
REGISTRY.set("CollectPersonalInfoFormComponent", CollectPersonalInfoFormComponent);
REGISTRY.set("EmergencyFormComponent", EmergencyFormComponent);
REGISTRY.set("NextAppointmentInfoFormComponent", NextAppointmentInfoFormComponent);
REGISTRY.set("RequestAppointmentFormComponent", RequestAppointmentFormComponent);
REGISTRY.set("MedicalProfileFormComponent", MedicalProfileFormComponent);

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // store services
  appConfig: IAppConfig;
  state: Array<any> = [];

  isShowMobileDownloadBar: boolean = true;

  constructor(private _router: Router, private _http: HttpClient, private _route: ActivatedRoute, private _componentFactoryResolver: ComponentFactoryResolver) {
    this.init(Database, Partner);
  }

  resolveComponent(component: string): Type<any> {
    return REGISTRY.get(component);
  }

  getProvider(id: number): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/provider`, { params: { id: id } });
  }

  getProvidersByParent(parentId: number) {
    return this._getProviders().pipe(map((val) => {
      val.data = _.filter(val.data, (p) => p.parentId == parentId);
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

  loadComponent<T>(container: ViewContainerRef, componentName: string): T {
    let component = this.resolveComponent(componentName);
    if (component) {
      const factory = this._componentFactoryResolver.resolveComponentFactory(component);
      console.log(componentName);
      const refComponent = container.createComponent(factory);
      return refComponent.instance;
    } else {
      console.log('cannot resolve ', componentName);
      return null;
    }
  }

  any(source: any[], count: number) {
    var result = [];

    for (var i = 0; i < source.length; i++) {

      if (result.length >= count) break;

      var need = count - result.length;
      if (Math.floor(Math.random() * (source.length - i - need)) == 0) {
        result.push(source[i]);
      }
    }

    return result;
  }
}
