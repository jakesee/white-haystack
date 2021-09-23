import { EventEmitter } from '@angular/core';

export interface IAppConfig {
  providerId: number;
  theme: ITheme;
  logoUrl: string;
  menuItems: Array<IMenuItem>;
  pageStyle: IPageStyle;
  header: ISection;
  footer: ISection;
  sections: Array<ISection>;
}

export interface ITheme {
  // body
  "--theme-font-family": string;
  "--theme-font-primary-color": string;
  "--theme-font-secondary-color": string;
  "--theme-font-inactive-color": string;
  "--theme-box-border-color": string;

  // header/footer
  "--theme-header-background-color": string;
  "--theme-footer-background-color": string;

  // background
  "--theme-primary-background-color": string;
  "--theme-secondary-background-color": string;

  // errors and warnings
  "--theme-error-background-color": string;
  "--theme-error-foreground-color": string;

  // buttons
  "--theme-button-border-radius": string;

  "--theme-button-primary-border-color": string;
  "--theme-button-primary-background-color": string;
  "--theme-button-primary-foreground-color": string;

  "--theme-button-secondary-border-color": string;
  "--theme-button-secondary-background-color": string;
  "--theme-button-secondary-foreground-color": string;

  "--theme-button-primary-inactive-border-color": string;
  "--theme-button-primary-inactive-background-color": string;
  "--theme-button-primary-inactive-foreground-color": string;

  "--theme-button-secondary-inactive-border-color": string;
  "--theme-button-secondary-inactive-background-color": string;
  "--theme-button-secondary-inactive-foreground-color": string;
}

export interface IMenuItem {
  text: string;
  routerLink: string;
  icon: Array<string>;
  display: { public: boolean, private: boolean };
}

export interface ISection {
  component: string;
  config: any;
}

export interface IPageStyle {
  container: PageStyleContainerEnum;
  content: PageStyleContentEnum;
}

export enum PageStyleContainerEnum {
  fluidContainer = 'wh-fluid-container',
  container = 'wh-container',
}
export enum PageStyleContentEnum {
  contentCenter = 'wh-content-center',
  contentLeft = 'wh-content-left',
}

export interface IForm {

  nextHandler: EventEmitter<FormEvent>;
  backHandler: EventEmitter<FormEvent>;
  cancelHandler: EventEmitter<FormEvent>;

  evaluate(config: any) : boolean
}

export class FormEvent {
  constructor(public form: IForm) {}
}

export class Section {

  provider: IProvider;

  init(config: any, provider: IProvider): void {
    Object.assign(this, config);
    this.provider = provider;
  }
}

export interface IProvider {
  id: number;
  parentId: number,
  order: 0,
  title: string;
  logoUrl: string,
  description: string;
  category: string;
  isMemberRequired: boolean,
  sections: Array<ISection>;
  journey?: {
    start: IJourney,
    [key:string]: IJourney
  };
}

export interface IJourney {
  auth: boolean
  label: string,
  cmdCancel: any;
  cmdSuccess: any;
  sequence: Array<ISequenceItem>;
}

export interface ISequenceItem {
  stepName: string;
  component: string;
  config: any;
}

export interface IDatabase {
  users: IUser[];
  providers: IProvider[];
}

export class IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthdate: string;
  episodes: IEpisode[];
}

export class User implements IUser {
  id: number;
  username: string;
  password: string;
  episodes: any[];

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

export interface IEpisode {
  doctorName: string;
  doctorImgUrl: string;
  startAt: number;
  endAt: number;
}
