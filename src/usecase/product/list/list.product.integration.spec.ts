import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";


describe('Test list product', () => {

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

  it('should list products', async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository)
    
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const output = {
      products: [
        {
          id: "123",
          name: "Product 1",
          price: 10
        },
        {
          id: "456",
          name: "Product 2",
          price: 20
        },
      ]
    }

    const result = await usecase.execute({})

    expect(result).toEqual(output)
  })

})
