import { sequence } from '@angular/animations';
import { Injectable } from '@angular/core';
import { CollectPersonalInfoFormComponent } from './collect-personal-info-form/collect-personal-info-form.component';
import { ColorSectionComponent } from './color-section/color-section.component';
import { ConsultNowComponent } from './consult-now/consult-now.component';
import { TriageFormComponent } from './triage-form/triage-form.component';

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
        imgURL: 'https://picsum.photos/200/80',
        menuItems: [
          { text: 'Home', command: 'home' },
          { text: 'Waiting Room', command: 'waiting-room' },
          { text: 'Profile', command: 'profile' }
        ]
      },
      HomeComponent: [
        { component: ColorSectionComponent, config: { color: '#336699' } },
        {
          component: ConsultNowComponent,
          config: {
            color: '#F44A22',
            buttonText: 'Talk to Doctor Now!',
            title: 'Awesome Co. Virtual Teleheath',
            command: ['journey', { id: 0 }]
          }
        },
        { component: ColorSectionComponent, config: { color: '#35FF88' } },
        {
          component: ConsultNowComponent,
          config: {
            color: '#117BD0',
            buttonText: 'Get a Health Screening',
            title: 'Cheap Health Screening Co.',
            command: ['journey', { id: 1 }]
          }
        },
        { component: ColorSectionComponent, config: { color: '#FF9864' } }
      ],
      JourneyComponent: [
        {
          cmdCancel: ['home'], // route navigate command
          cmdSuccess: ['waiting-room'], // route navigate command
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
          cmdCancel: ['home'], // route navigate command
          cmdSuccess: ['waiting-room'], // route navigate command
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
