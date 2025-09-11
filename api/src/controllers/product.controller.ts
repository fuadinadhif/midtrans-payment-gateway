import { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

const productService = new ProductService();

export class ProductController {
  async getAll(req: Request, res: Response) {
    const products = await productService.getAll();
    return res.status(200).json(products);
  }
}
