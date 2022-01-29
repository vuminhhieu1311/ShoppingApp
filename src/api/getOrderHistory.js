const getOrderHistory = (token) => ( 
    fetch('http://localhost/api/order_history.php',
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

module.exports = getOrderHistory;

