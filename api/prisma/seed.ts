import {
  PrismaClient,
  Role,
  PaymentStatus,
  User,
  Product,
} from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.info("Seeding started");

  /* -------------------------- Delete Previous Data -------------------------- */
  console.info("Delete previous data...");
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.product.deleteMany();

  /* ------------------------------ Create Users ------------------------------ */
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const role = i === 0 ? Role.TENANT : Role.CUSTOMER; // 1 tenant, rest customers
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role,
      },
    });
    users.push(user);
  }

  /* ----------------------------- Create Products ---------------------------- */
  const products: Product[] = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 5, max: 5000, fractionDigits: 2 }),
      },
    });
    products.push(product);
  }

  /* ------------------- Create Orders (only for customers) ------------------- */
  const customerUsers = users.filter((u) => u.role === Role.CUSTOMER);

  for (let i = 0; i < 50; i++) {
    const customer = faker.helpers.arrayElement(customerUsers);
    const product = faker.helpers.arrayElement(products);

    await prisma.order.create({
      data: {
        userId: customer.id,
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
        paymentStatus: faker.helpers.arrayElement([
          PaymentStatus.PENDING,
          PaymentStatus.PAID,
          PaymentStatus.FAILED,
        ]),
      },
    });
  }

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
