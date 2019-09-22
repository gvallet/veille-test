import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'classe',
        loadChildren: () => import('./classe/classe.module').then(m => m.VeilletestClasseModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.VeilletestStudentModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VeilletestEntityModule {}
