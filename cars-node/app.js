console.log('Starting the application');

const fs = require('fs');
var cars = require('./cars.js');

var _ = require('lodash');
var yargs = require('yargs');


//get yarg arguments
const yargcommands = yargs.argv;
console.log(yargcommands);

const command = yargcommands._[0];
const id = yargcommands.id;
const make = yargcommands.make;
const model = yargcommands.model;
const color = yargcommands.color;
const year = yargcommands.year;
const owner = yargcommands.owner;
const newOwner = yargcommands.newOwner;

console.log('user action is: ', command);

//get process arguments
//const commands = process.argv;
//const command = process.argv[2];


if (command === 'add') {
 var car = cars.addCar(id, make, model, color, year, owner);
 if(car) {
     cars.logCarInfo(car);
 } else {
     console.log('car id already exists');
 }
} else if (command === 'list') {
   var carsList = cars.listCars();
   console.log('no. of cars:', carsList.length);
   carsList.forEach(car => {
       cars.logCarInfo(car);
   });
} else if (command === 'read') {
    var car = cars.readCar(id);
    if(car) {
    cars.logCarInfo(car);
    } else {
        console.log('car not found');
    }
} else if (command === 'change'){
    var car = cars.changeOwner(id, newOwner);
    if(car) {
        cars.logCarInfo(car);
        } else {
            console.log('car not found');
        }
}else {
    console.log('command not recognized');
}

