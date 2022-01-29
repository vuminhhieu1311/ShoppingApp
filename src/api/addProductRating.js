const addProductRating = (id, starNumber) => (
    fetch('http://localhost/api/add_product_rating.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id, starNumber })
        })
        .then(res => res.text())
);

module.exports = addProductRating;

