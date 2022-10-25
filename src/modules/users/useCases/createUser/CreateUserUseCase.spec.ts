import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let useCase: CreateUserUseCase;
let repository: InMemoryUsersRepository;

describe("Create user", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    useCase = new CreateUserUseCase(repository);
  });
  
  it("Should be able to create a new user", async () => {
    const user = await useCase.execute({
      email: "test@test.com",
      name: "Name test",
      password: "pass-test"
    });

    expect(user).toEqual(expect.objectContaining({
      email: "test@test.com",
      name: "Name test",
    }));
  })
})