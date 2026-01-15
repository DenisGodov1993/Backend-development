const http = require("http");
const getUsers = require("./modules/users");

const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");

  // ?hello=<name>
  if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");

    response.setHeader("Content-Type", "text/plain; charset=utf-8");

    if (!name) {
      response.statusCode = 400;
      response.end("Enter a name");
      return;
    }

    response.statusCode = 200;
    response.end(`Hello, ${name}`);
    return;
  }

  // ?users
  if (url.searchParams.has("users")) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(getUsers());
    return;
  }

  // без параметров
  if (![...url.searchParams.keys()].length) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end("Hello, World!");
    return;
  }

  // любые другие параметры
  response.statusCode = 500;
  response.end();
});

server.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});

// const http = require("http");
// const getUsers = require('./modules/users');

// const server = http.createServer((request, response) => {
//   if (request.url === "/users") {
//     response.status = 200;
//     response.statusMessage = "OK";
//     response.header = "Content-Type: application/json";
//     response.write(getUsers());
//     response.end();

//     return;
//   }

//   response.status = 200;
//   response.statusMessage = "OK";
//   response.header = "Content-Type: text/plain";
//   response.write("Hello, world!");
//   response.end();
// });

// server.listen(3003, () => {
//   console.log("Сервер запущен по адресу http://127.0.0.1:3003");
// });
