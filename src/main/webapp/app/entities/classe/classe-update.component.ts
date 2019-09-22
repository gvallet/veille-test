import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClasse, Classe } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html'
})
export class ClasseUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    nbStudents: [],
    teacher: []
  });

  constructor(protected classeService: ClasseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.updateForm(classe);
    });
  }

  updateForm(classe: IClasse) {
    this.editForm.patchValue({
      id: classe.id,
      name: classe.name,
      nbStudents: classe.nbStudents,
      teacher: classe.teacher
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const classe = this.createFromForm();
    if (classe.id !== undefined) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  private createFromForm(): IClasse {
    return {
      ...new Classe(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      nbStudents: this.editForm.get(['nbStudents']).value,
      teacher: this.editForm.get(['teacher']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
