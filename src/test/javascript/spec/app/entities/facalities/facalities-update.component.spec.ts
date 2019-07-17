/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacalitiesUpdateComponent } from 'app/entities/facalities/facalities-update.component';
import { FacalitiesService } from 'app/entities/facalities/facalities.service';
import { Facalities } from 'app/shared/model/facalities.model';

describe('Component Tests', () => {
  describe('Facalities Management Update Component', () => {
    let comp: FacalitiesUpdateComponent;
    let fixture: ComponentFixture<FacalitiesUpdateComponent>;
    let service: FacalitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacalitiesUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacalitiesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacalitiesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacalitiesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Facalities(123);
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
        const entity = new Facalities();
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
