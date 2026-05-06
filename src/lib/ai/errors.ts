export class AIRateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIRateLimitError";
  }
}

export class AIResponseParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIResponseParseError";
  }
}
