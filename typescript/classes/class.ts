// // class Vehicle{
// //     fuel(){
// //         console.log('Fueling.....');
        
// //     }
// //     speed(){
// //         console.log('Speeding...');
        
// //     }
// // }

// // class Car extends Vehicle{
// //     constructor(public name:string){
// //         super()
// //     }
// // drive(){
// //     console.log('driving....')
// // }
// //     }
// // const car = new Car('Mercedes Benz')
// // console.log(car);



// //KeyOf & TypeOf

// // const LogLevel = Object.freeze({
// //     ERROR: "error",
// //     WARN: "warn",
// //     INFO: "info",
// //     DEBUG: "debug",
// //    })

// //    as const;
//     //convert Loglevel to an object 
//     // then check type of LogLevel 
//     // keyof checks the property type of the object list of LogLevel
// //    type LogLevel = typeof LogLevel[keyof typeof LogLevel];
    
// //    let warning1: LogLevel = LogLevel.ERROR;
    
// //    let warning2: keyof typeof LogLevel = "ERROR"

// //    console.log(LogLevel)


// // Decorators

// function noZeroDivision(target, key, descriptor):any{
//     let original = descriptor.value;

//     descriptor.value = function (...args) {
//         if (args.includes(0)){
//             throw new Error("Cannot divide by zero.");
//         }
//         return original.apply(this, args);
//     }     
//     return descriptor; 
// } class Calculator {
//         @noZeroDivision
//         divide(a, b) {
//             return a / b;
//         } 
//     }
//     let calculator = new Calculator();
//     console.log(calculator.divide(4, 2)); 
//     // Output: 2console.log(calculator.divide(4, 0)); // Throws Error: Cannot divide by zero.