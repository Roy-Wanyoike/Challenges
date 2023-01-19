function addTo() {
  const inpt = document.querySelectorAll("input");
  for (let i = 0; i < inpt.length; i++) {
    let newValue = inpt[i];
    let p = document.createElement("p");
    p.innerText = newValue.value;
    document.body.appendChild(p);
  }
}
