const cds = require('@sap/cds')
const moment = require('moment');

module.exports = async function ( )
{
// registriamo l'handler che scatterà alla chiamata alla funzione  
await cds.connect()
const { Dipendenti } = cds.entities 

// Funzione calcolo salario medio
this.on('avgSalary', calcAvg );

// Campo calcolato - anzianità
this.after ('READ','Dipendenti', each => {
    let now = moment()
    let b = moment(each.dataAss)
    each.anzianita = now.diff(b,'years')
})


// check che responsabile dipartimento sia un manager !
this.before ('CREATE','Dipartimenti', async (req)=>{
let respId = req.data.responsabile_ID
let resp = await cds.read('Dipendenti').where({ID:respId})

if (resp[0].ruolo !== 'Manager')
{
    req.reject(400, "Il responsabile del dipartimento deve essere un manager!")
} 

})






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