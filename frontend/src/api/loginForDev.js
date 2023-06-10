const users = new Map([
  ["billgates@microsoft.com", "62a6ed9b77607a88cf0713b3"],
  ["amberhead@microsoft.com", "62a705c5a5279241564730bf"],
  ["cinderella@microsoft.com", "62a7096ca5279241564730c9"],
]);

function loginForDev(email, password) {
  const login = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!users.has(email)) {
        resolve({ code: 401 });
      } //exit on first resolve
      resolve({ code: 200, id: users.get(email) });
    }, 500);
  });

  return login;
}

export default loginForDev;
