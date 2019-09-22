import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClasse } from 'app/shared/model/classe.model';
import { AccountService } from 'app/core';
import { ClasseService } from './classe.service';

@Component({
  selector: 'jhi-classe',
  templateUrl: './classe.component.html'
})
export class ClasseComponent implements OnInit, OnDestroy {
  classes: IClasse[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected classeService: ClasseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.classeService
      .query()
      .pipe(
        filter((res: HttpResponse<IClasse[]>) => res.ok),
        map((res: HttpResponse<IClasse[]>) => res.body)
      )
      .subscribe(
        (res: IClasse[]) => {
          this.classes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInClasses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IClasse) {
    return item.id;
  }

  registerChangeInClasses() {
    this.eventSubscriber = this.eventManager.subscribe('classeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
