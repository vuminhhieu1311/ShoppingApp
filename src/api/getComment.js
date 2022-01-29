const getComment = (id) => {
    const url = `http://localhost/api/get_comment.php?product_id=${id}`;
    return fetch(url)
        .then(res => res.json());
};

export default getComment;
