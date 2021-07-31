const getOrderDetail = (id) => {
    const url = `http://localhost/api/order_detail.php?id=${id}`;
    return fetch(url)
    .then(res => res.json());
};

export default getOrderDetail;
