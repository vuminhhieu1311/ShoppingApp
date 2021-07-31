const register = (name, email, phone, password) => (
    fetch('http://localhost/api/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password})
    }).then(res => res.text())
);

module.exports = register;