/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacalitiesComponent } from 'app/entities/facalities/facalities.component';
import { FacalitiesService } from 'app/entities/facalities/facalities.service';
import { Facalities } from 'app/shared/model/facalities.model';

describe('Component Tests', () => {
  describe('Facalities Management Component', () => {
    let comp: FacalitiesComponent;
    let fixture: ComponentFixture<FacalitiesComponent>;
    let service: FacalitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacalitiesComponent],
        providers: []
      })
        .overrideTemplate(FacalitiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacalitiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacalitiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Facalities(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facalities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
