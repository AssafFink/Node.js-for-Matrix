const EventEmitter = require("events");

class Car extends EventEmitter {

    constructor(manufacturer, model) {
        super();
        this.manufacturer = manufacturer;
        this.model = model;
    }

    drive() {

        let fuel = 10;

        const timerId = setInterval(() => {

            console.log("Driving...");

            fuel--;

            if (fuel > 0 && fuel <= 3) {

                // Raising an event:
                this.emit("LowFuel", { fuelLeft: fuel });
            }
            
            if (fuel === 0) {
                clearInterval(timerId);
                
                // Raising an event:
                this.emit("NoFuel");
            }

        }, 1000);

    }

}

module.exports = Car;