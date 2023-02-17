// async function callMumAfter2hrs() {​
//       return new Promise(calling => {​
//         setTimeout(() => {​
//           calling('I am about to call mum now......');
//         }​, 5000);
//         console.log('I am about to call mum now......',1000);
//         console.log("Pick up the phone am calling",2000);
//         console.log("Mum has picked the phone",3000);
//         console.log("Say Hello to Mum dude",4000);
//     console.log("She is speaking alone", 5000);
//       }​);
//     }​
//      
//     callMumAfter2hrs();
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '943ddc9bd1msh336b19f222a52eap169b68jsn3331acfedd4f',
// 		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
// 	}
// };

// fetch('https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));


    async function getData(){
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(response);
    }