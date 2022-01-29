const getUserInfo = (id) => {
    const url = `http://localhost/api/get_user.php?id=${id}`;
    return fetch(url)
    .then(res => res.json());
};

export default getUserInfo;
