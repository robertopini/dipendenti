using { Dipartimenti as DipaModel, Dipendenti as DipeModel } from '../db/schema';

service DipService {
  entity Dipendenti as projection on DipeModel;
  entity Dipartimenti as projection on DipaModel;
}