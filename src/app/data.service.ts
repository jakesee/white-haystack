import { Injectable } from '@angular/core';
import { CollectPersonalInfoFormComponent } from './form/collect-personal-info-form/collect-personal-info-form.component';
import { ColorSectionComponent } from './sections/color-section/color-section.component';
import { ConsultNowComponent } from './sections/consult-now/consult-now.component';
import { TriageFormComponent } from './form/triage-form/triage-form.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  config: any;
  state: Array<any> = [];

  constructor() {
    this._loadConfig();

    console.log('DataService Constructed');
  }

  private _loadConfig() {
    this.config = {
      HeaderComponent: {
        imgURL:
          'https://my-doc.com/wp-content/uploads/2019/11/mydoc-logo-@2x.png',
        menuItems: [
          { text: 'Home', routerLink: '/home' },
          { text: 'Waiting Room', routerLink: '/waiting-room' },
          { text: 'Profile', routerLink: '/profile' }
        ]
      },
      HomeComponent: [
        {
          component: ConsultNowComponent,
          config: {
            imgSource:
              'https://app.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png',
            title: 'Awesome Co. Virtual Teleheath',
            subText:
              'Operational Hours: 0800H - 2200H, including weekend and holidays',
            buttonText: 'Talk to Doctor Now!',
            command: ['journey', { id: 0 }]
          }
        },
        { component: ColorSectionComponent, config: { color: '#336699' } },
        { component: ColorSectionComponent, config: { color: '#35FF88' } },
        {
          component: ConsultNowComponent,
          config: {
            imgSource:
              'https://app.my-doc.com/baoviet/assets/images/banner_web.png',
            title: 'Premptive Health Screening Programme',
            subText: 'Have a peace mind and assurance',
            buttonText: 'Get a Health Screening',
            command: ['journey', { id: 1 }]
          }
        },
        { component: ColorSectionComponent, config: { color: '#FF9864' } }
      ],
      JourneyComponent: [
        {
          cmdCancel: ['/home'], // route navigate command
          cmdSuccess: ['/waiting-room'], // route navigate command
          sequence: [
            {
              component: TriageFormComponent,
              config: { questionText: 'What complaints do you have today?' }
            },
            {
              component: CollectPersonalInfoFormComponent,
              config: { title: 'Please provide your personal info.' }
            }
          ]
        },
        {
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
