const postProduct = (name, price, color, material, description, idType) => {
    return fetch('http://localhost/api/add_product.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name, price, color, material, description, idType })
        })
        .then(res => res.json())
};

module.exports = postProduct;

