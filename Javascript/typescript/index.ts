console.log("Hello Boy I am gonna learn Typescript");

function Add (a:number, b:number, c:number, operation : 'add'| 'minus'|'product'): any{
if(operation=='add'){
    return a+b+c
}
else if(operation=='minus') {
    return a-b-c
}
return a*b*c
}

console.log(50,40,30);