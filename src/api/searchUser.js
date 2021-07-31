const searchUser = (key) => {
    const url = `http://localhost/api/search_user.php?key=${key}`;
    return fetch(url)
    .then(res => res.json());
};

export default searchUser;
