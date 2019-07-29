import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacalities } from 'app/shared/model/facalities.model';
import { FacalitiesService } from './facalities.service';

@Component({
  selector: 'jhi-facalities-delete-dialog',
  templateUrl: './facalities-delete-dialog.component.html'
})
export class FacalitiesDeleteDialogComponent {
  facalities: IFacalities;

  constructor(
    protected facalitiesService: FacalitiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.facalitiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'facalitiesListModification',
        content: 'Deleted an facalities'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-facalities-delete-popup',
  template: ''
})
export class FacalitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facalities }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FacalitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.facalities = facalities;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/facalities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/facalities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
