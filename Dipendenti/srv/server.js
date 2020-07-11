//const cds = require('./lib/cds')
const cds = require("@sap/cds");


/**
 * Standard express.js bootstrapping, constructing an express `application`
 * and launching a corresponding http server using `app.listen()`.
 * Project-specific `./server.js` can overload this and react to these
 * events:
 *
 * - cds.on('boostrap',(app)) - emitted before any middleware is added
 * - cds.on('loaded',(model)) - emitted when a model was loaded
 * - cds.on('connect',(srv)) - emitted when a service was connected
 * - cds.on('serving',(srv)) - emitted when a service was served
 * - cds.on('listening',({server,url})) - emitted when the server is listening
 *
 * @param {object} options - canonicalized options from `cds serve` cli
 * @param {boolean} options.in_memory - true if we need to bootstrap an in-memory database
 * @param {string} options.service - name of service to be served; default: 'all'
 * @param {string} options.from - filenames of models to load; default: '*'
 * @param {object} options.app - filenames of models to load; default: '*'
 * @returns Promise resolving to a Node.js http server as returned by express' `app.listen()`.
 */
module.exports = async (options) => {

    const express = require('express')
    const app = cds.app = options.app || express()
    cds.emit('bootstrap',app) // hook for project-local server.js

    // mount static resources and common middlewares...
    app.use (express.static (cds.env.folders.app))  //> defaults to ./app
    console.log(cds.env.folders.app)
    app.get ('/',(_,res) => res.send (index.html))  //> if none in ./app
    
    app.use ('/favicon.ico', express.static (__dirname+'/etc/favicon.ico', {maxAge:'14d'}))
    app.use (options.logger||logger)  //> basic request logging

        // custom routes
   // POST method route
    app.post('/testInser', function (req, res) {
    console.log(req);
    res.send('Express correctly handled POST request');
});
    //get Routes
    var opt = {
    root: './app'
    };
    app.get ('/listaDipendenti',(_,res) => res.sendFile('listadipe.html', opt));  
    app.get ('/listaDipartimenti',(_,res) => res.sendFile('listadipa.html', opt)); 
 app.get ('/insertDipartimento',(_,res) => res.sendFile('insertdipa.html', opt)); 
    //get Routes
    app.get('/insertDipendente',function (req, res) {
  res.send('Render insert dipendente');
});

    // load specified models or all in project
    const model = cds.model = await cds.load (options.from)

    // bootstrap --in-memory db if requested
    if (options.in_memory) cds.db = await cds.deploy (model,options)

    // connect to primary database if required
    else if (cds.requires.db) cds.db = await cds.connect.to('db')

    // construct and mount modelled services
    const services = await cds.serve (options) .from (model) .in (app)
    cds.emit ('served', services)

    // start http server
    return app.listen (options.port || process.env.PORT || 4004)





}


// -------------------------------------------------------------------------
// helpers...

//const {index} = require ('./lib/utils/app/index_html')
// helpers...
try {
    var {index:index1} = require ('./node_modules/@sap/cds/lib/utils/app/index_html')
} catch (error) {
    var {index:index2} = require ('../node_modules/@sap/cds/lib/utils/app/index_html')
}
const index = index1 || index2;


const DEBUG = cds.debug('server')
const logger = (req,_,next) => { /* eslint-disable no-console */
    console.log (req.method, decodeURI(req.url))
    if (/\$batch/.test(req.url))  req.on ('dispatch', (req) => {
        console.log ('>', req.event, req._.path, req._.query)
        if (DEBUG && req.query) console.debug (req.query)
    })
    next()
}


// -------------------------------------------------------------------------
if (!module.parent)  module.exports (process.argv[2])
