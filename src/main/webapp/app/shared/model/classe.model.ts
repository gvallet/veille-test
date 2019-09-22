import { IStudent } from 'app/shared/model/student.model';

export interface IClasse {
  id?: number;
  name?: string;
  nbStudents?: number;
  teacher?: string;
  eleves?: IStudent[];
}

export class Classe implements IClasse {
  constructor(public id?: number, public name?: string, public nbStudents?: number, public teacher?: string, public eleves?: IStudent[]) {}
}
