const checkLogin = (token) => ( 
    fetch('http://localhost/api/check_login.php',
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({token})
    })
    .then(res => res.json())
    .catch(e => {
        console.log(e);
    })
);

module.exports = checkLogin;

