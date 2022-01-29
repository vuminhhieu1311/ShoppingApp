const changeImages = (id, link) => {
    const url = `http://localhost/api/update_images.php?id=${id}&link="${link}"`;
    return fetch(url)
    .then(res => res.text());
};

export default changeImages;
