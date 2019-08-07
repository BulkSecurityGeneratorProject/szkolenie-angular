/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacilitiesUpdateComponent } from 'app/entities/facilities/facilities-update.component';
import { FacilitiesService } from 'app/entities/facilities/facilities.service';
import { Facilities } from 'app/shared/model/facilities.model';

describe('Component Tests', () => {
  describe('Facilities Management Update Component', () => {
    let comp: FacilitiesUpdateComponent;
    let fixture: ComponentFixture<FacilitiesUpdateComponent>;
    let service: FacilitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacilitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacilitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Facilities(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Facilities();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
