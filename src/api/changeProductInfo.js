const changeInfo = (id, name, price, color, material, description) => {
    return fetch('http://localhost/api/change_product_info.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id, name, price, color, material, description })
        })
        .then(res =>res.text())
    };

module.exports = changeInfo;

