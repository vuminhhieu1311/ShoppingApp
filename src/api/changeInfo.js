import global from "../components/global";

const changeInfo = (token, name, address, phone, email, avatar) => (
    fetch('http://localhost/api/change_info.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ token, name, address, phone, email, avatar })
        })
        .then(res => res.json())
        .then(user => {
             global.onSignIn(user);
        })
        .catch(e => {
            console.log(e);
        })
);

module.exports = changeInfo;

