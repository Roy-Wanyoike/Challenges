// class MyClass {
//     private _property: string;
  
//     private constructor(propertyValue: string) {
//       this._property = propertyValue;
//     }
  
//     public static create(propertyValue: string) {
//       return new MyClass(propertyValue);
//     }
  
//     public get property(): string {
//       return this._property;
//     }
//   }
  
//   const instance = MyClass.create("property value");
//   console.log(instance.property); // Outputs: "property value"
  
class Animal {
    private _walk: string;
    private name(_walk: string) {
        this._walk = "";    
        return name;  
    }
    public static create(eat:string){
        return new Animal(eat)
    }
    public get eat(): string {
        return this.eat;
    }
}

const cow = Animal.create("walk")
console.log(cow.eat);
