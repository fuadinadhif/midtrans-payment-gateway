import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await productService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error(`Failed to get all product data: ${error}`);
      return res
        .status(500)
        .json({ message: "Failed to get all product data" });
    }
  }
}
