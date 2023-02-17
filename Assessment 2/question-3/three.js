// JavaScript implementation of the approach

let num = "";
let temp = num;
let p = 0;

/*function to calculate
the sum of individual digits */
while (num > 0) {

	let rem = num % 10;
	p = (p) + (rem * rem * rem);
	n = Math.floor(num / 10);
}

/* condition to check whether
the value of P equals
to user input or not. */
if (temp == p) {
    document.getElementById("output").innerHTML = temp;
	console.log("Yes. It is Armstrong No.");
}
else {
    document.getElementById("output").innerHTML = temp;
	console.log("No. It is not an Armstrong No.");
}