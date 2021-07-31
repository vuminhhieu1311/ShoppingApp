const changeAddress = (token, address) => (
    fetch('http://localhost/api/change_address.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token, address })
        })
        .then(res => res.json())
);

module.exports = changeAddress;

