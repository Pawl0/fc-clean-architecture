import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product A", 10)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn()
  }
}

describe('Test find product', () => {

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product A", 10)

    await productRepository.create(product);

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "Product A",
      price: 10
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product A", 10);

    await productRepository.create(product);

    const input = {
      id: "123"
    }

    expect(() => usecase.execute(input)).rejects.toThrow(new Error("Product not found"));
  });
});