const getOrderByStatus = (status) => {
    const url = `http://localhost/api/get_order_by_status.php?status=${status}`;
    return fetch(url)
        .then(res => res.json());

};

export default getOrderByStatus;
