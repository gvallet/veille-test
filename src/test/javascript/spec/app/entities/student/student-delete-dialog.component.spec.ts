/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VeilletestTestModule } from '../../../test.module';
import { StudentDeleteDialogComponent } from 'app/entities/student/student-delete-dialog.component';
import { StudentService } from 'app/entities/student/student.service';

describe('Component Tests', () => {
  describe('Student Management Delete Component', () => {
    let comp: StudentDeleteDialogComponent;
    let fixture: ComponentFixture<StudentDeleteDialogComponent>;
    let service: StudentService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VeilletestTestModule],
        declarations: [StudentDeleteDialogComponent]
      })
        .overrideTemplate(StudentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudentService);
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