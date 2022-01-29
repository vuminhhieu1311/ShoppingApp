const getAllUsers = () => {
    const url = `http://localhost/api/get_all_users.php`;
    return fetch(url)
    .then(res => res.json());
    
};

export default getAllUsers;
