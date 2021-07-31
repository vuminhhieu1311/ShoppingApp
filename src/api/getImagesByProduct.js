const getImagesByProduct = (id) => {
    const url = `http://localhost/api/get_images.php?id=${id}`;
    return fetch(url)
    .then(res => res.json());
};

export default getImagesByProduct;
