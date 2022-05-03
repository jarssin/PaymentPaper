'use strict'

/*
|--------------------------------------------------------------------------
| TpContaSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const TpConta = use('App/Models/TpConta')

class TpContaSeeder {
  async run () {
      await TpConta.createMany([
        {
            name: "ADM-APR",
        },
        {
            name: "ADM-ADM",
        },
        { 
            name: "ADM-FIN",
        },
        {
            name: "ADM-CON",
        },
        {
            name: "ADM-FIS",
        },
        {
            name: "ADM-CPD",
        },
        {
            name: "ADM-RH",
        },
        {
            name: "ADM-PES",
        },
        {
            name: "ADM-SER",
        },
        {
            name: "ADM-RES",
        },
        {
            name: "RH-RH",
        },
        {
            name: "RH-PES",
        },
        {
            name: "COM-COM",
        },
        {
            name: "COM-VEN",
        },
        {
            name: "COM-GER",
        },
        {
            name: "COM-LIC",
        },
        {
            name: "COM-SUP",
        },
        {
            name: "COM-CPD",
        },
        {
            name: "COM-SER",
        },
        {
            name: "COM-FIS",
        },
        {
            name: "COM-AUT",
        },
        {
            name: "COM-INT",
        },
        {
            name: "COM-CAP",
        },
        {
            name: "LOG-GER",
        },
        {
            name: "LOG-ENC",
        },
        {
            name: "LOG-CON",
        },
        {
            name: "LOG-CONS",
        },
        {
            name: "LOG-SEP",
        },
        {
            name: "LOG-REP",
        },
        {
            name: "LOG-AJU",
        },
        {
            name: "LOG-CAR",
        },
        {
            name: "LOG-AUT",
        },
        {
            name: "LOG-ADM",
        },
        {
            name: "LOG-MOT",
        },
        {
            name: "LOG-SER",
        }, 
        {
            name: "LOG-FAR",
        }, 
        {
            name: "LOG-RES",
        },
        {
            name:  "LOG-APR"
        }    
      ])
  }
}

module.exports = TpContaSeeder
