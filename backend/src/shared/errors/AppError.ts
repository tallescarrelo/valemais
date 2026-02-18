export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 400, code = 'APP_ERROR', details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(message: string, details?: unknown) {
    return new AppError(message, 400, 'BAD_REQUEST', details);
  }

  static unauthorized(message = 'Nao autenticado') {
    return new AppError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Sem permissao') {
    return new AppError(message, 403, 'FORBIDDEN');
  }

  static notFound(message = 'Recurso nao encontrado') {
    return new AppError(message, 404, 'NOT_FOUND');
  }

  static conflict(message: string) {
    return new AppError(message, 409, 'CONFLICT');
  }

  static validation(details: unknown) {
    return new AppError('Dados invalidos', 400, 'VALIDATION_ERROR', details);
  }

  static internal(message = 'Erro interno do servidor') {
    return new AppError(message, 500, 'INTERNAL_ERROR');
  }
}
