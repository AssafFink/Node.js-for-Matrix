const { Observable } = require("rxjs");

function randomNumbers(count) {

    return new Observable(observer => {

        const timerId = setInterval(() => {

            try {
                const num = Math.floor(Math.random() * 100);

                // Report next value: 
                observer.next(num);

                count--;

                if(count === 0) {
                    clearInterval(timerId);

                    // Report complete:
                    observer.complete();
                }

            }
            catch (err) {
                clearInterval(timerId);

                // Report error:
                observer.error(err);
            }

        }, 500);


    });


}

module.exports = randomNumbers;