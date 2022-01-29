const deleteProduct = (id) => {
    const url = `http://localhost/api/delete_product.php?id=${id}`;
    return fetch(url)
    .then(res => res.text())
    .catch(e => console.log(e));
};

export default deleteProduct;