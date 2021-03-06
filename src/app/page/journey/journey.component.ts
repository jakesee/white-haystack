import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/data.service';
import { IForm, FormEvent, IProvider, ISequenceItem } from '@app/interfaces';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  // provider
  provider: IProvider = {} as IProvider;

  // sequence of forms
  sequence: ISequenceItem[];
  progress: number = -1; // index
  farthest: number = -1; // index

  // router.navigate commands
  cmdCancel: [];
  cmdSuccess: [];

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._construct();
  }

  private async _construct() {
    const journeyId: number = this._route.snapshot.params.jid;
    const providerId: number = this._route.snapshot.params.pid;
    await this._dataService.getProvider(providerId).toPromise().then((response) => {
      this.provider = response.data;
      const journey = this.provider.journey[journeyId];
      this.cmdCancel = journey.cmdCancel;
      this.cmdSuccess = journey.cmdSuccess;
      this.sequence = journey.sequence;

      this._next(null);
    });
  }

  ngOnInit() {}

  private _next(event: FormEvent) {
    this.progress++;
    if (this.progress < this.sequence.length) {

      const complete = this._loadForm(this.progress);

      // skip the form if already complete
      if (complete && (this.progress > this.farthest)) this._next(event);

    } else {
      this._router.navigate(this.cmdSuccess);
    }
  }

  private _back(event: FormEvent) {

    // record the furthest we've been in the journey
    this.farthest = this.progress > this.farthest ? this.progress : this.farthest;

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

  private _loadForm(progress: number): boolean {
    const step = this.sequence[progress];

    this.container.clear();

    let instance: IForm = this._dataService.loadComponent(this.container, step.component);
    instance.backHandler.subscribe(event => { this._back(event); });
    instance.nextHandler.subscribe(event => { this._next(event); });
    instance.cancelHandler.subscribe(event => { this._cancel(event); });
    return instance.evaluate(step.config);
  }

  public get journeyStepCount(): number {
    return this.sequence.length;
  }

  public get currentJourneyStep():number {
    return this.progress + 1;
  }
}
