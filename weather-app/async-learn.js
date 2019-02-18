

function getUser(id, userFn) {
    var user = {
        id: id,
        name: 'Venkat'
    }
    userFn(user);
}

var user = getUser(21, (user) => {
  
console.log('user', user);
})