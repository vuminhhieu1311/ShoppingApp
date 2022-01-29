const getCommentAdmin = (id) => {
    const url = `http://localhost/api/get_comment_admin.php?product_id=${id}`;
    return fetch(url)
        .then(res => res.json());
};

export default getCommentAdmin;
