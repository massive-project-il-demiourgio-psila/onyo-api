import { inject, injectable } from "tsyringe";
import { type IHelloWorldRepository } from "@/domains/repositories/hello-world-repository";

@injectable()
export default class GetHelloUseCase {

    helloWorldRepo: IHelloWorldRepository

    constructor(@inject("IHelloWorldRepository") helloWorldRepo: IHelloWorldRepository) {
        this.helloWorldRepo = helloWorldRepo;
    }

    execute = async () => {
        let hello = await this.helloWorldRepo.getHelloWorld();
        return hello
    }
}
