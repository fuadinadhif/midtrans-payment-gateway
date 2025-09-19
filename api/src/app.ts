import express, { Application, Request, Response } from "express";

import cors from "cors";

import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";

class App {
  #app: Application;

  constructor() {
    this.#app = express();
    this.#config();
    this.#routes();
  }

  #config(): void {
    this.#app.use(cors({ origin: "http://localhost:3000", credentials: true }));
    this.#app.use(express.json());
  }

  #routes(): void {
    this.#app.get("/api/health", (req: Request, res: Response) => {
      return res.status(200).json({ message: "OK" });
    });
    this.#app.use("/api/users", userRoutes);
    this.#app.use("/api/products", productRoutes);
    this.#app.use("/api/orders", orderRoutes);
  }

  public listen(port: number): void {
    this.#app.listen(port, () =>
      console.info(`Server is listening on port: ${port}`)
    );
  }
}

export default App;
