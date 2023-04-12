import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product A', async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 10,
        type: "a",
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(10);
  });
  
  it('should create a product B', async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 10,
        type: "b",
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe("Product B");
    expect(response.body.price).toBe(20);
  });

  it('should not create a product', async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product fail",
      });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product A",
        price: 10,
        type: "a",
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Product B",
        price: 10,
        type: "b",
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product B");
    expect(product2.price).toBe(20);
  });

});