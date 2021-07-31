const getOrders = () => {
    const url = `http://localhost/api/get_orders.php`;
    return fetch(url)
        .then(res => res.json());

};

export default getOrders;
