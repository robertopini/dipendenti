//db/schema.cds
using { managed, sap } from '@sap/cds/common';

entity Dipendenti 
 {                     
  key ID : Integer;
  nome  : String(100);
  cognome  : String(100);
  ruolo: Ruolo;
  dipartimento : Association to one Dipartimenti; 
  dataAss  : Date;    
  salario  : Decimal(5,0)
}

entity Dipartimenti 
 {
key ID: Integer;
nome : String(50);
responsabile : Association to one Dipendenti;     
}

type Ruolo : String enum {                         
  Operaio; Impiegato; Manager;
}