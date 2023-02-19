"use strict";
// const input1 = document.getElementById('firstword') as HTMLInputElement | null;
// const input2 = document.getElementById('secondword') as HTMLInputElement | null;
// const value = input1?.value;
// console.log(value)
// if (input1 != null) {
//     console.log(input1.value);
// }
// input1?.addEventListener('input', function (event) {
//     const target = event.target as HTMLInputElement;
//     console.log(target.value);
//   });
//   if (input2 != null){
//     console.log(input2.value);
//   }
function isAnagram(str1, str2) {
    let n1 = str1.length;
    let n2 = str2.length;
    if (n1 != n2)
        return false;
    for (let i = 0; i < n1; i++)
        if (str1[i] != str2[i])
            return false;
    return true;
}
let str1 = ['g', 'r', 'a', 'm'];
let str2 = ['a', 'r', 'm'];
if (isAnagram(str1, str2))
    document.write("The two strings are"
        + " anagram of each other<br>");
else
    document.write("The two strings are not"
        + " anagram of each other<br>");
