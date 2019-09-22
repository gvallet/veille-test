import { IClasse } from 'app/shared/model/classe.model';

export interface IStudent {
  id?: number;
  name?: string;
  firstName?: string;
  averageGrade?: number;
  classe?: IClasse;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string, public firstName?: string, public averageGrade?: number, public classe?: IClasse) {}
}
