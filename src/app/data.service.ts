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
  config: any;
  state: Array<any> = [];

  isShowMobileDownloadBar: boolean = true;

  constructor(private _router: Router, private _http: HttpClient, private _route: ActivatedRoute) {
    this._loadConfig();
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

  private _getProviders():Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/providers`);
  }

  private _loadConfig() {
    this.config = {
      providerId: 13,
      HeaderComponent: {
        imgURL:
          'https://my-doc.com/wp-content/uploads/2019/11/mydoc-logo-@2x.png',
        menuItems: [
          { text: 'Home', routerLink: '/home', icon: ['fas', 'home'], display: { public: true, private: true } },
          { text: 'Dashboard', routerLink: '/dashboard', icon: ['fas', 'home'], display: { public: true, private: true } },
          // { text: 'Care Network', routerLink: '/care-network', icon: ['fas', 'heart'], display: { public: true, private: true } },
          { text: 'Waiting Room', routerLink: '/waiting-room', icon: ['fas', 'calendar-alt'], display: { public: true, private: true } },
          { text: 'Profile', routerLink: '/profile', icon: ['fas', 'user'], display: { public: true, private: true } },
        ]
      },
      HomeComponent: [
        {
          component: ConsultNowComponent,
          config: {
            imgSource:
              'https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png',
            title: 'Awesome Co. Virtual Teleheath',
            subText:
              'Operational Hours: 0800H - 2200H, including weekend and holidays',
            buttonText: 'Talk to Doctor Now!',
            command: ['/provider', 13, 'journey', 'start']
          }
        },
        { component: SymptomsSectionComponent, config: {} },
        { component: OnetwothreeSectionComponent, config: {} },
        {
          component: NeedAssistanceSectionComponent,
          config: {
            content: "<p>Need any assistance? Call us at</p><p><b>Dai-ichi Life Vietnam<br /> (028) 38100888</b><br /> 08: 00 - 17: 30, Mon - Fri and 08: 00 - 12: 00, Sat </p><p><b>MyDoc <br /> 0707150628</b><br /> 8: 00 to 22: 00, incl.weekend & holidays </p>"
          }
        },
        {
          component: BannerSectionComponent,
          "config": {}
        }
      ],
      journey: {
        start: {
          auth: true,
          cmdCancel: ['/home'], // route navigate command
          cmdSuccess: ['/waiting-room'], // route navigate command
          sequence: [
            {
              component: EmergencyFormComponent,
              config: {}
            },
            {
              component: NextAppointmentInfoFormComponent,
              config: {}
            },
            {
              component: TriageFormComponent,
              config: { questionText: 'What complaints do you have today?' }
            },
            {
              component: CollectPersonalInfoFormComponent,
              config: { title: 'Please provide your personal info.' }
            },
            {
              component: RequestAppointmentFormComponent,
              config: {}
            }
          ]
        }
      }
    };
  }
}
