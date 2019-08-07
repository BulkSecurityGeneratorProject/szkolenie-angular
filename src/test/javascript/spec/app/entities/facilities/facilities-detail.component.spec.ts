/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacilitiesDetailComponent } from 'app/entities/facilities/facilities-detail.component';
import { Facilities } from 'app/shared/model/facilities.model';

describe('Component Tests', () => {
  describe('Facilities Management Detail Component', () => {
    let comp: FacilitiesDetailComponent;
    let fixture: ComponentFixture<FacilitiesDetailComponent>;
    const route = ({ data: of({ facilities: new Facilities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacilitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacilitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacilitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facilities).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
