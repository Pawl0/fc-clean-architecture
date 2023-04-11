import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe('Test create product', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close(); 
  });

  it('should create a product type A', async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: "Product Name",
      price: 10,
      type: "a"
    }

    const output = {
      id: expect.any(String),
      name: "Product Name",
      price: 10
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it('should create a product type B', async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: "Product Name",
      price: 10,
      type: "b"
    }

    const output = {
      id: expect.any(String),
      name: "Product Name",
      price: 20
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

})