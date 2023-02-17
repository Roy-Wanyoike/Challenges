
## Document Object Manipulation

![/image.png](/DOM/DoM_htmltree.gif)

- Javascript dom represents html as a tree and then javascript targets the html elements and changes the content without refreshing. 
- To access a html element you can use 
***
- document.getElementById("")
- document.getElementByClass("")
- document.querySelector("#sidebar")// use dots and hashes
- document.getElementsByTagName(name) //finds elements by tag name	
- QuerySelectorAll

***

```
const div = document.getElementById("header");
console.log(div)
```
Nesting Query Selectors
- You can select multiple elements in one tag. The nesting happeneds by combining several tags. 
example
```
document.querySelector('#sidebar').getElementByTag("a")

##Changing HTML elements

element.innerHTML = new html content

element.attribute = new value 
element.style.property = new style 


Methods used
- element.setAttribute(attribute,value)

- To set text in html you can use
   - Use .innerText
- use .textContent