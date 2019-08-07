/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacilitiesDeleteDialogComponent } from 'app/entities/facilities/facilities-delete-dialog.component';
import { FacilitiesService } from 'app/entities/facilities/facilities.service';

describe('Component Tests', () => {
  describe('Facilities Management Delete Component', () => {
    let comp: FacilitiesDeleteDialogComponent;
    let fixture: ComponentFixture<FacilitiesDeleteDialogComponent>;
    let service: FacilitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacilitiesDeleteDialogComponent]
      })
        .overrideTemplate(FacilitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilitiesService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
