import { EventEmitter, Type } from '@angular/core';

export interface Form {
  progress: number;
  progressMax: number;

  onNext: EventEmitter<FormEvent>;
  onBack: EventEmitter<FormEvent>;
  onCancel: EventEmitter<FormEvent>;

  init(config: any, progress: number, progressMax: number) : void
}

export class FormEvent {
  constructor(public form: Form) {}
}

export interface Section {
  init(config: any);
}

export interface DefinitionSection {
  component: Type<any>;
  config: any;
}

export class User {

  constructor(public firstName: string, public lastName: string, public gender: string, public birthdate:Date) { }

  getName(): string {
    return this.firstName + " " + this.lastName;
  }
}
