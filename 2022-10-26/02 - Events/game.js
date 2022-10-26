const Car = require("./car");

class Game {

    start() {

        const car = new Car("Lamborghini", "Diablo");

        // Registering an event
        car.on("LowFuel", args => {
            console.log("Low fuel: " + args.fuelLeft + " litter left!");
        });
        
        // Registering an event
        car.on("NoFuel", () => {
            console.log("NO FUEL!! GAME OVER!!");
        });

        car.drive();

    }

}

module.exports = Game;