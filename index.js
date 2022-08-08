// import the server and start it!

//REPL:
//Read, Eval, Print, Loop
//-----------
console.log('my first node application');

const server = require('./api/server')

server.listen(9000, () => {
    console.log("server is now listening on port 9000")
});

//export default server; x no
//module.exports = server;  x yes 
//module.exports = { a,b }; x yes 