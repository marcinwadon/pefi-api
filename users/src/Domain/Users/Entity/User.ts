export class User {
    constructor(
        private name: string,
        private email: string
    ) {}

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }
}
