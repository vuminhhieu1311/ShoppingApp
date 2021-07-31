const postImage = (id, link) => {
    const url = `http://localhost/api/post_image.php?id=${id}&link="${link}"`;
    return fetch(url)
        .then(res => res.text());
};

export default postImage;
