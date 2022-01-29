const sendOrder = (token, arrayDetail, note) => (
    fetch('http://localhost/api/cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ token, arrayDetail, note})
    }).then(res => res.text())
);

module.exports = sendOrder;