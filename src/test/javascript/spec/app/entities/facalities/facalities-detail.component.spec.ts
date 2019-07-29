/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SzkolenieangularTestModule } from '../../../test.module';
import { FacalitiesDetailComponent } from 'app/entities/facalities/facalities-detail.component';
import { Facalities } from 'app/shared/model/facalities.model';

describe('Component Tests', () => {
  describe('Facalities Management Detail Component', () => {
    let comp: FacalitiesDetailComponent;
    let fixture: ComponentFixture<FacalitiesDetailComponent>;
    const route = ({ data: of({ facalities: new Facalities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SzkolenieangularTestModule],
        declarations: [FacalitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacalitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacalitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facalities).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
