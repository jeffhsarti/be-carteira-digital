export class ClientNotFoundException extends Error {
  constructor(id: string) {
    super(`Client with ID ${id} not found.`);
    this.name = "ClientNotFoundException";
  }
}

export class ClientAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`Client with email ${email} already exists.`);
    this.name = "ClientAlreadyExistsException";
  }
}
