const getUserDetail = (token) => (
    fetch('http://localhost/api/get_user_info.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token })
        })
        .then(res => res.json())
);

module.exports = getUserDetail;

