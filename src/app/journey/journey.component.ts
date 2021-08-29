import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Form, FormEvent } from '../interfaces';

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
    const journeyId: number = parseInt(_route.snapshot.paramMap.get('id') as string);
    const config = _dataService.config.JourneyComponent[journeyId];

    this.cmdCancel = config.cmdCancel;
    this.cmdSuccess = config.cmdSuccess;
    this.sequence = config.sequence;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.progress = 0;
    setTimeout(() => {
      this._loadForm(this.progress);
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
      this._router.navigate(this.cmdCancel);
    }
  }

  private _cancel(event: FormEvent) {
    this._dataService.state = []; // reset state
    this._router.navigate(this.cmdCancel);
  }

  private _loadForm(progress: number) {
    const step: any = this.sequence[progress];
    this.container.clear();
    const factory = this._componentFactoryResolver.resolveComponentFactory(
      step.component
    );
    const compRef = this.container.createComponent(factory);
    const instance: Form = compRef.instance as Form;
    instance.init(step.config, progress, this.sequence.length);
    instance.onBack.subscribe(event => {
      this._back(event);
    });
    instance.onNext.subscribe(event => {
      this._next(event);
    });
    instance.onCancel.subscribe(event => {
      this._cancel(event);
    });
  }
}
