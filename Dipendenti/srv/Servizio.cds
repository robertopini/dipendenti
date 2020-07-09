using { Dipartimenti as DipaModel, Dipendenti as DipeModel } from '../db/schema';

service DipService {
  entity Dipendenti as select from DipeModel {
      *,
      null as longevita: Integer
  };
  
  entity Dipartimenti as projection on DipaModel;
//
   function avgSalary() 
    returns Decimal;

}



 