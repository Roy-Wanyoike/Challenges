"use strict";
// let person = {
//     name: "Roy Wanyoike",
//     age: 30
// }
// for(let key in person){
//     console.log(person[key]);
// }
// function CheckProperty<T extends object, U extends keyof T>(obj:T, key:U){
//     return obj[key];
// }
// console.log(CheckProperty(person,'age'));
// 
class DataStore {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getData() {
        return [...this.data];
    }
}
const numberDataStore = new DataStore();
numberDataStore.addItem(30);
numberDataStore.addItem(40);
numberDataStore.addItem(50);
numberDataStore.removeItem(80);
console.log(numberDataStore.getData());
