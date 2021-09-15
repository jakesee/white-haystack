import { Injectable, TestabilityRegistry, Type } from '@angular/core';
import { CollectPersonalInfoFormComponent } from './form/collect-personal-info-form/collect-personal-info-form.component';
import { ConsultNowComponent } from './sections/consult-now/consult-now.component';
import { TriageFormComponent } from './form/triage-form/triage-form.component';
import { Router } from '@angular/router';
import { User } from './interfaces';
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


export const REGISTRY = new Map<string, Type<any>>();
// Sections
REGISTRY.set("ConsultNowComponent", ConsultNowComponent);
REGISTRY.set("SymptomsSectionComponent", SymptomsSectionComponent);
REGISTRY.set("OnetwothreeSectionComponent", OnetwothreeSectionComponent);
REGISTRY.set("BannerSectionComponent", BannerSectionComponent);
REGISTRY.set("NeedAssistanceSectionComponent", NeedAssistanceSectionComponent);
REGISTRY.set("TitleBarSectionComponent", TitleBarSectionComponent);
// Forms
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

  constructor(private _router: Router, private _http: HttpClient, ) {
    this._loadConfig();
  }

  resolveComponent(component: string): Type<any> {
    return REGISTRY.get(component);
  }

  getProvider(id: number): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/provider`, { params: { id: id } }).pipe(map(response => response.data));
  }

  getProviders() {
    return this._http.get<any>(`${environment.apiUrl}/providers`).toPromise();
  }

  private _loadConfig() {
    this.config = {
      HeaderComponent: {
        imgURL:
          'https://my-doc.com/wp-content/uploads/2019/11/mydoc-logo-@2x.png',
        menuItems: [
          //{ text: 'Home', routerLink: '/home' },
          { text: 'Home', routerLink: '/explore', icon: ['fas', 'home'] },
          { text: 'Care Network', routerLink: '/care-network', icon: ['fas', 'heart'] },
          { text: 'Feeds', routerLink: '/feeds', icon: ['fas', 'newspaper'] },
          { text: 'Appointments', routerLink: '/waiting-room', icon: ['fas', 'calendar'] },
          { text: 'Settings', routerLink: '/profile', icon: ['fas', 'user'] },
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
            command: ['journey']
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
        { component: BannerSectionComponent, config: {} },
        {
          component: ConsultNowComponent,
          config: {
            imgSource:
              'https://app.qa.my-doc.com/baoviet/assets/images/banner_web.png',
            title: 'Premptive Health Screening Programme',
            subText: 'Have a peace mind and assurance',
            buttonText: 'Get a Health Screening',
            command: ['journey', { id: 1 }]
          }
        },
      ],
      JourneyComponent: [
        {
          auth: true,
          cmdCancel: ['/home'], // route navigate command
          cmdSuccess: ['/waiting-room'], // route navigate command
          sequence: [
            {
              component: EmergencyFormComponent,
              config: { }
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
        },
        {
          auth: false,
          cmdCancel: ['/home'], // route navigate command
          cmdSuccess: ['/waiting-room'], // route navigate command
          sequence: [
            {
              component: CollectPersonalInfoFormComponent,
              config: { title: '请输入您的个人信息。' }
            },
            {
              component: TriageFormComponent,
              config: { questionText: "Health Screening is fun, isn't it?" }
            },
            {
              component: TriageFormComponent,
              config: { questionText: 'last step for health screening' }
            }
          ]
        }
      ]
    };
  }
}
