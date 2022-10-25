import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let useCase: GetBalanceUseCase;
let repositoryStatement: InMemoryStatementsRepository;
let repositoryUser: InMemoryUsersRepository;

describe("Show balance", () => {
  beforeEach(() => {
    repositoryStatement = new InMemoryStatementsRepository();
    repositoryUser = new InMemoryUsersRepository();
    useCase = new GetBalanceUseCase(repositoryStatement, repositoryUser);
  });
  
  it("Should be able to show user balance", async () => {
    const create = await repositoryUser.create({
      email: 'test@test.com',
      name: 'Name test',
      password: '$2a$08$DZ2rXb.cz4Li/RG0Fws8WOfccccECMmjQK2YCbALd2L9Z6d6njzA2'
    })

    const balance = await useCase.execute({ user_id: String(create.id) });

    expect(balance).toHaveProperty("statement");
    expect(balance).toHaveProperty("balance");
  })
})