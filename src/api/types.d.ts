declare module "@metamodules/postgres" {
  interface Main {
    new(): import("pg").Pool;
  }
  const main: Main;
  export default main;
}
