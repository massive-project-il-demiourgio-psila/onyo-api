export interface IHelloWorldRepository {
  getHelloWorld(): Promise<string>
}
