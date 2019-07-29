/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacalitiesDeleteDialogComponent } from 'app/entities/facalities/facalities-delete-dialog.component';
import { FacalitiesService } from 'app/entities/facalities/facalities.service';

describe('Component Tests', () => {
  describe('Facalities Management Delete Component', () => {
    let comp: FacalitiesDeleteDialogComponent;
    let fixture: ComponentFixture<FacalitiesDeleteDialogComponent>;
    let service: FacalitiesService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacalitiesDeleteDialogComponent]
      })
        .overrideTemplate(FacalitiesDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacalitiesDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacalitiesService);
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
