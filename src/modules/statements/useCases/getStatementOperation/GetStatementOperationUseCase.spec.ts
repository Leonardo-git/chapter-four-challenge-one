import { User } from "../../../users/entities/User";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let useCase: GetStatementOperationUseCase;
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
    useCase = new GetStatementOperationUseCase(repositoryUser, repositoryStatement);

    user = await repositoryUser.create({
      email: 'test@test.com',
      name: 'Name test',
      password: '$2a$08$DZ2rXb.cz4Li/RG0Fws8WOfccccECMmjQK2YCbALd2L9Z6d6njzA2'
    })
  });

  it("Should be able to listing a statement", async () => {
    const deposit = await repositoryStatement.create({ 
      amount: 100,
      description: "Deposit description",
      type: "deposit" as OperationType,
      user_id: String(user.id)
     });
     
    const withdraw = await repositoryStatement.create({ 
      amount: 90,
      description: "Withdraw description",
      type: "withdraw" as OperationType,
      user_id: String(user.id)
     });
     
    const statement1 = await useCase.execute({
      user_id: String(user.id), statement_id: String(withdraw.id)
    })

    const statement2 = await useCase.execute({
      user_id: String(user.id), statement_id: String(deposit.id)
    })

    expect(statement1.amount).toBe(90);
    expect(statement2.amount).toBe(100);
  })
})