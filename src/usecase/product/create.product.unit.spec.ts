import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product Test",
  price: 10,
  type: "a"
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product type 'a'", async () => {
    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProductUseCase(productRepository)

    const output = await productCreateUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
  
  it("should create a product type 'b'", async () => {
    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProductUseCase(productRepository)

    input.type = "b"

    const output = await productCreateUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: 2 * input.price,
    });
  });
});