
const fs = require('fs');

var addCar = function addNote(id, make, model, color, year, owner) {
    console.log('adding a car with id: ', id);

    //create a car object
    var cars = [];
    var car = {
      id: id,
      make: make,
      model: model,
      color: color,
      year: year,
      owner: owner
    }
    // validate and get the cars list
    cars = validateCars();
    
    //check for the same id
    var duplicates = cars.filter(car => {
      return car.id === id;
    });

    if(duplicates.length === 0) {
      cars.push(car);
      saveCars(cars);
      return car;
    } 
  }

var listCars = function listCars() {
    console.log('listing all cars');
    // validate and get the cars list
    return validateCars();
} 

var readCar = function readCar(id) {
  console.log('reading a car with id:', id);
  // validate and get the cars list
  var cars = validateCars();
  return cars.find(car => {
     if(car.id === id) {
     return car;
     }
  });
  
}

var changeOwner = function changeOwner(id, newOwner) {
 var cars = validateCars();
 
 var carObject = cars.find(car => {
     return car.id === id;
 })

 if (carObject) {
 carObject.owner = newOwner;
 } else {
   return;
 }

 var filteredCars = cars.filter (car => {
  return car.id !== id;
})
 
filteredCars.push(carObject);
  
  saveCars(filteredCars);
  return carObject;
}

var logCarInfo = function logCarInfo(car) {
  console.log('------');
  console.log('car id', car.id);
  console.log('car make', car.make);
  console.log('car model', car.model);
  console.log('car color', car.color);
  console.log('car year', car.year);
  console.log('car owner', car.owner);
  console.log('------');
}

function validateCars() {
  var cars = [];
  try {
    var carsString = fs.readFileSync('cars.json');
    return JSON.parse(carsString);
  } catch (error) {
    console.log(error);
    return cars;
  }
}

function saveCars(cars) {
  fs.writeFileSync('cars.json', JSON.stringify(cars));
}

module.exports = {
    addCar,
    listCars,
    readCar,
    changeOwner,
    logCarInfo
}