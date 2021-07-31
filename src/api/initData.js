const initData = () => (
    fetch('http://localhost/api/')
    .then(res => res.json())
);

export default initData;