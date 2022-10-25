import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let useCase: ShowUserProfileUseCase;
let repository: InMemoryUsersRepository;

describe("Show user", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    useCase = new ShowUserProfileUseCase(repository);
  });

  it("Should be able to show user profile", async () => {
    const create = await repository.create({
      email: 'test@test.com',
      name: 'Name test',
      password: '$2a$08$DZ2rXb.cz4Li/RG0Fws8WOfccccECMmjQK2YCbALd2L9Z6d6njzA2'
    })

    const profile = await useCase.execute(String(create.id));

    expect(profile).toHaveProperty("id");
  })
})