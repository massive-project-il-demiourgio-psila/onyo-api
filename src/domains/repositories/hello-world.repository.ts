interface IHelloWorldRepository {
  getHelloWorld(): Promise<string>
}

export default IHelloWorldRepository
