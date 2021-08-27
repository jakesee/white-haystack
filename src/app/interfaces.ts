import { EventEmitter, Type } from '@angular/core';

export interface Form {
  progress: number;
  progressMax: number;

  onNext: EventEmitter<FormEvent>;
  onBack: EventEmitter<FormEvent>;
  onCancel: EventEmitter<FormEvent>;

  init(config: any, progress: number, progressMax: number);
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
