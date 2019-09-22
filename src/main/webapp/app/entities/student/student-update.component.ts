import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving: boolean;

  classes: IClasse[];

  editForm = this.fb.group({
    id: [],
    name: [],
    firstName: [],
    averageGrade: [],
    classe: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentService: StudentService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
    });
    this.classeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClasse[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClasse[]>) => response.body)
      )
      .subscribe((res: IClasse[]) => (this.classes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(student: IStudent) {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      firstName: student.firstName,
      averageGrade: student.averageGrade,
      classe: student.classe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      firstName: this.editForm.get(['firstName']).value,
      averageGrade: this.editForm.get(['averageGrade']).value,
      classe: this.editForm.get(['classe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClasseById(index: number, item: IClasse) {
    return item.id;
  }
}
