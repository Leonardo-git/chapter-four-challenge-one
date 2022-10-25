import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../../users/entities/User";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let useCase: CreateStatementUseCase;
let repositoryStatement: InMemoryStatementsRepository;
let repositoryUser: InMemoryUsersRepository;
let user: User;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create deposit and withdraw", () => {
  beforeAll(async () => {
    repositoryStatement = new InMemoryStatementsRepository();
    repositoryUser = new InMemoryUsersRepository();
    useCase = new CreateStatementUseCase(repositoryUser, repositoryStatement);

    user = await repositoryUser.create({
      email: 'test@test.com',
      name: 'Name test',
      password: '$2a$08$DZ2rXb.cz4Li/RG0Fws8WOfccccECMmjQK2YCbALd2L9Z6d6njzA2'
    })
  });

  it("Should be able to create a new deposit", async () => {
    const deposit = await useCase.execute({ 
      amount: 100,
      description: "Deposit description",
      type: "deposit" as OperationType,
      user_id: String(user.id)
     });
     
     expect(deposit).toHaveProperty("id");
  })

  it("Should be able to create a new withdraw", async () => {
    const withdraw = await useCase.execute({ 
      amount: 90,
      description: "Withdraw description",
      type: "withdraw" as OperationType,
      user_id: String(user.id)
     });
     
     expect(withdraw).toHaveProperty("id");
  })

  it("Should not be able to create a withdraw with an insufficient balance", async () => {
     expect(async () => {
      await useCase.execute({ 
        amount: 11,
        description: "Withdraw description",
        type: "withdraw" as OperationType,
        user_id: String(user.id)
       });
     }).rejects.toBeInstanceOf(AppError);
  })
})