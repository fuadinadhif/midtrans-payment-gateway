import express, { Application, Request, Response } from "express";

class App {
  #app: Application;

  constructor() {
    this.#app = express();
    this.#config();
    this.#routes();
  }

  #config(): void {
    this.#app.use(express.json());
  }

  #routes(): void {
    this.#app.get("/api/health", (req: Request, res: Response) => {
      return res.status(200).json({ message: "OK" });
    });
  }

  public listen(port: number): void {
    this.#app.listen(port, () =>
      console.info(`Server is listening on port: ${port}`)
    );
  }
}

export default App;
