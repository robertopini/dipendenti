const cds = require('@sap/cds')
module.exports = async function ( )
{
// registriamo l'handler che scatterà alla chiamata alla funzione  
await cds.connect()
const { Dipendenti } = cds.entities 

this.on('avgSalary', calcAvg );

this.on('READ','Dipendenti')










// Function di calcolo salario medio
async function calcAvg( )
{
const dipendenti =   await cds.run (SELECT.from(Dipendenti))
console.log(dipendenti)
let somma = 0;
dipendenti.forEach(element => {
   somma = somma + element.salario  
 });
 
 let avg = somma / dipendenti.length; 

console.log(avg);
return avg;
}


}