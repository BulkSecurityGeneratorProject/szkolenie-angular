/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacilitiesComponent } from 'app/entities/facilities/facilities.component';
import { FacilitiesService } from 'app/entities/facilities/facilities.service';
import { Facilities } from 'app/shared/model/facilities.model';

describe('Component Tests', () => {
  describe('Facilities Management Component', () => {
    let comp: FacilitiesComponent;
    let fixture: ComponentFixture<FacilitiesComponent>;
    let service: FacilitiesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacilitiesComponent],
        providers: []
      })
        .overrideTemplate(FacilitiesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacilitiesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacilitiesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Facilities(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facilities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
