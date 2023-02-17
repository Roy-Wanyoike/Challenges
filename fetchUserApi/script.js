fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((sheep) => {
      const markup = `<tr >
      <td class="goat">${sheep.name}</td>
      <td class="goat">${sheep.email}</td>
      <td class="goat">${sheep.username}</td>
  </tr>`;
      document.getElementById("monkey").insertAdjacentHTML('afterend',markup);
    // document.createElement = `<td>{sheep.id</td>`
    
    });
  })
  .catch((error) => console.log(error));
