export async function addUser(userDetails) {
  let response = await fetch("http://localhost:27017/users/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  });
  return response;
};


export async function getAllBooks(type) {
  let data = await fetch('http://localhost:27017/books/getAllBooks/' + type)
  return await data.json();
}

export async function logIn(identifiers) {
  let userDetails = await fetch('http://localhost:27017/users/logIn', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(identifiers),
  });
  return await userDetails.json();
}

export async function addProductToUser(details) {
  let res = await fetch("http://localhost:27017/users/addProductToUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
  return res
}

export async function deleteAllInstancesProductToUser(details) {
  let res = await fetch("http://localhost:27017/users/deleteAllInstancesProductToUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
  return res
}

export async function deleteOneProductToUser(details) {
  let res = await fetch("http://localhost:27017/users/deleteOneProductToUser", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
  return res
}

export async function getCart(id) {
  return await (await fetch("http://localhost:27017/users/getCart/" + id)).json();
}