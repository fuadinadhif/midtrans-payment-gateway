import App from "./app";

const PORT = process.env.PORT || 8000;

const server = new App();
server.listen(Number(PORT));
