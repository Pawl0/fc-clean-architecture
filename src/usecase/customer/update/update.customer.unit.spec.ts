import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.custoemr.usecase";

const customer = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", 123, "zip", "city")
);

const input = {
  id: customer.id,
  name: "John Updated",
  adddress: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated",
  },
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn().mockReturnValue(Promise.resolve(input)),
  };
};

describe("Unit test customer update use case", () => {
  
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerRepository.update(input);

    expect(output).toEqual(input);
  });
});