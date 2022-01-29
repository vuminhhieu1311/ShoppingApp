const changeCommentStatus = (id, status) => {
    const url = `http://localhost/api/change_comment_status.php?id=${id}&status=${status}`;
    return fetch(url)
    .then(res => res.text());
};

export default changeCommentStatus;
