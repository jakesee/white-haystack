import { EventEmitter, Type } from '@angular/core';

export interface Form {

  nextHandler: EventEmitter<FormEvent>;
  backHandler: EventEmitter<FormEvent>;
  cancelHandler: EventEmitter<FormEvent>;

  init(config: any) : void
}

export class FormEvent {
  constructor(public form: Form) {}
}

export class Section {
  init(config: any): void {
    Object.assign(this, config);
  }
}

export interface DefinitionSection {
  component: Type<any>;
  config: any;
}

export interface ProviderData {
  id: number;
  title: string;
  description: string;
  image: string;
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

  static create(template: object): User {
    let user = new User();
    Object.assign(user, template);

    return user;
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}
