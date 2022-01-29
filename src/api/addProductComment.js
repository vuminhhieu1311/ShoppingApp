const addProductComment = (productId, userId, comment, starNumber) => (
    fetch('http://localhost/api/add_product_comment.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ productId, userId, comment, starNumber })
        })
        .then(res => res.text())
);

module.exports = addProductComment;

