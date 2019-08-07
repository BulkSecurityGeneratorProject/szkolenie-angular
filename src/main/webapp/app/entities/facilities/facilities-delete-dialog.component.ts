import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacilities } from 'app/shared/model/facilities.model';
import { FacilitiesService } from './facilities.service';

@Component({
  selector: 'jhi-facilities-delete-dialog',
  templateUrl: './facilities-delete-dialog.component.html'
})
export class FacilitiesDeleteDialogComponent {
  facilities: IFacilities;

  constructor(
    protected facilitiesService: FacilitiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.facilitiesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'facilitiesListModification',
        content: 'Deleted an facilities'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-facilities-delete-popup',
  template: ''
})
export class FacilitiesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ facilities }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FacilitiesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.facilities = facilities;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/facilities', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/facilities', { outlets: { popup: null } }]);
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
