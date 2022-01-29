const getActiveUsers = (status) => {
    const url = `http://localhost/api/get_active_users.php?status=${status}`;
    return fetch(url)
    .then(res => res.json());
};

export default getActiveUsers;
