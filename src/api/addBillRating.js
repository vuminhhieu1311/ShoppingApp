const addBillRating = (id, starNumber, comment) => (
    fetch('http://localhost/api/add_bill_rating.php',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ id, starNumber, comment })
        })
        .then(res => res.text())
);

module.exports = addBillRating;

