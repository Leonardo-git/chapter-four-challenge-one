import "dotenv/config";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let useCase: AuthenticateUserUseCase;
let repository: InMemoryUsersRepository;

describe("Authenticate user", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    useCase = new AuthenticateUserUseCase(repository);
  });
  
  it("Should be able to authenticate a user", async () => {
    await repository.create({
      email: 'test@test.com',
      name: 'Name test',
      password: '$2a$08$DZ2rXb.cz4Li/RG0Fws8WOfccccECMmjQK2YCbALd2L9Z6d6njzA2'
    })

    const auth = await useCase.execute({
      email: "test@test.com",
      password: "pass-test"
    });

    expect(auth).toHaveProperty("token");
  })
})