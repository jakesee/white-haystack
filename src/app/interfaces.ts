import { EventEmitter, Type } from '@angular/core';

export interface Form {
  progress: number;
  progressMax: number;

  nextHandler: EventEmitter<FormEvent>;
  backHandler: EventEmitter<FormEvent>;
  cancelHandler: EventEmitter<FormEvent>;

  init(config: any, progress: number, progressMax: number) : void
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

export class User {

  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;

  static create(template: object): User {
    let user = new User();
    Object.assign(user, template);

    return user;
  }

  get name(): string {
    return this.firstName + " " + this.lastName;
  }
}
