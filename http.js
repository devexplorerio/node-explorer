const http = require('http');

const PORT = 3000;

const server = http.createServer();

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

server.on('request', (req, res) => {
    const items = req.url.split('/');

    if(req.method === 'POST' && items[1] === 'friends') {
        res.statusCode = 200;
        req.on('data', (data) => {
            const friend = data.toString();
            friends.push(JSON.parse(friend));
            console.log(friend);
        });
        req.pipe(res);
    } else if(req.method === 'GET' && items[1] === 'friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        if(items.length === 3) {
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        } else {
            res.end(JSON.stringify(friends));
        }
    } else if(req.method === 'GET' && items[1] === '') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>Hello World</h1>');
        res.write('<h2>Hello Sir Isaac Newton</h2>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }

});

/* 
    Type in your Browser Inspector Console to make a post request:

    fetch('http://localhost:3000/friends', {
        method: 'POST',
        body: JSON.stringify({id: 3, name: 'Ryan Dahl'})
    })
    .then((res) => res.json())
    .then((friend) => console.log(friend));

    Note: To satisfy CORS we have to be in url: http://localhost:3000/friends
*/

/* server.on('request', (req, res) => {
    if(req.url === '/friends') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            id: 1,
            name: 'Sir Isaac Newton'
        }));
    } else if(req.url === '/hello') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.end('<h1>Hello World</h1>');
        res.end('<h2>Hello Sir Isaac Newton</h2>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }

}); */


/* const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
        id: 1,
        name: 'Sir Isaac Newton'
    }))
}); */


/* const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.end('<h1>Hello World</h1>');
});
 */


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

