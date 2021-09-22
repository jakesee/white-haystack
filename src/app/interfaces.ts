import { EventEmitter } from '@angular/core';

export interface IAppConfig {
  providerId: number;
  theme: { [key: string]: any };
  logoUrl: string,
  menuItems: Array<IMenuItem>;
  header: ISection;
  footer: ISection;
  sections: Array<ISection>;
}

export interface IMenuItem {
  text: string,
  routerLink: string,
  icon: Array<string>,
  display: { public: boolean, private: boolean };
}

export interface ISection {
  component: string;
  config: any;
}


export interface Form {

  nextHandler: EventEmitter<FormEvent>;
  backHandler: EventEmitter<FormEvent>;
  cancelHandler: EventEmitter<FormEvent>;

  evaluate(config: any) : boolean
}

export class FormEvent {
  constructor(public form: Form) {}
}

export class Section {

  provider: any;

  init(config: any, provider: any): void {
    Object.assign(this, config);
    this.provider = provider;
  }
}



export interface ProviderData {
  id: number;
  title: string;
  description: string;
  logoImage: string;
  sections: Array<ComponentData>;
  journeys: Array<JourneyData>;
}

export interface JourneyData {
  auth: boolean;
  cmdCancel: any;
  cmdSuccess: any;
  sequence: Array<ComponentData>;
}

export interface ComponentData {
  component: string;
  config: any;
}

export class User {

  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;

  medicalCondition: string;
  medication: string;
  allergies: string;

  is2faEnabled: boolean;

  static create(template: object): User {
    let user = new User();
    Object.assign(user, template);

    return user;
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}
