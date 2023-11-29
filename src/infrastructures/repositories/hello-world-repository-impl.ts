import { IHelloWorldRepository } from "@/domains/repositories/hello-world-repository";
import { inject, injectable } from "tsyringe";
import { sql } from "drizzle-orm";
import type { MySqlDrizzleSchema } from "@/infrastructures/data-sources/mysql";

@injectable()
export default class HelloWorldRepository implements IHelloWorldRepository {

    private drizzle: MySqlDrizzleSchema

    constructor(@inject("drizzle") drizzle: MySqlDrizzleSchema) {
        this.drizzle = drizzle
    }

    async getHelloWorld(): Promise<string> {
        const [rows, fields] = await this.drizzle.execute<Record<"Hello World", string>>(sql`SELECT "Hello World"`);
        return (rows as any)[0]["Hello World"]
    }

}
