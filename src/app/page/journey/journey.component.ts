import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/data.service';
import { Form, FormEvent, ProviderData } from '@app/interfaces';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  // sequence of forms
  sequence: Array<any>;
  progress: number = 0;

  // router.navigate commands
  cmdCancel: [];
  cmdSuccess: [];

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this._construct();
  }

  private async _construct() {
    const journeyId: number = this._route.snapshot.params.jid;
    const providerId: number = this._route.snapshot.params.pid;
    await this._dataService.getProvider(providerId).toPromise().then((data) => {
      const journey = data.journeys[journeyId];
      this.cmdCancel = journey.cmdCancel;
      this.cmdSuccess = journey.cmdSuccess;
      this.sequence = journey.sequence;

      this.progress = 0;
      this._loadForm(this.progress);
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {

    setTimeout(() => {

    });
  }

  private _next(event: FormEvent) {
    this.progress++;
    if (this.progress < this.sequence.length) {
      this._loadForm(this.progress);
    } else {
      this._router.navigate(this.cmdSuccess);
    }
  }

  private _back(event: FormEvent) {
    this.progress--;
    if (this.progress >= 0) {
      this._loadForm(this.progress);
    } else {
      this._router.navigate(this.cmdCancel, { relativeTo: this._route });
    }
  }

  private _cancel(event: FormEvent) {
    this._dataService.state = []; // reset state
    this._router.navigate(this.cmdCancel, { relativeTo: this._route });
  }

  private _loadForm(progress: number) {
    const step: any = this.sequence[progress];
    this.container.clear();
    const componentType = this._dataService.resolveComponent(step.component);
    const factory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    const compRef = this.container.createComponent(factory);
    const instance: Form = compRef.instance as Form;

    instance.backHandler.subscribe(event => {
      this._back(event);
    });
    instance.nextHandler.subscribe(event => {
      this._next(event);
    });
    instance.cancelHandler.subscribe(event => {
      this._cancel(event);
    });

    instance.init(step.config);
  }

  public get journeyStepCount(): number {
    return this.sequence.length;
  }

  public get currentJourneyStep():number {
    return this.progress + 1;
  }
}
