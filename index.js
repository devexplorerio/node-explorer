const express = require('express');

const app = express();
const PORT = 3000;


const friends = [
    {
        id: 0,
        name: 'Sir Isaac Newton'
    },
    {
        id: 1,
        name: 'Albert Einstein'
    },
    {
        id: 2,
        name: 'Sir Tesla'
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.get('/friends', (req, res) => {
    res.json(friends);
});

app.get('/friends/:id', (req, res) => {
    const id = Number(req.params.id);
    const friend = friends[id];
    if (!friend) return res.status(404).send('Friend not found');
    res.json(friend);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
