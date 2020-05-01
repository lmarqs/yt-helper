declare module '@metamodules/postgres' {
    var main: () => import("pg").Pool
    export = main
}