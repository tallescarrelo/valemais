import crypto from 'crypto';

/**
 * Gera codigo de cartao virtual no formato VM-YYYY-XXXXX
 */
export function generateCardCode(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  const bytes = crypto.randomBytes(5);
  for (let i = 0; i < 5; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return `VM-${year}-${code}`;
}

/**
 * Gera codigo de parceiro no formato P + primeiras letras do nome + random
 */
export function generatePartnerCode(tradeName: string): string {
  const prefix = tradeName
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .slice(0, 6);
  const year = new Date().getFullYear();
  const bytes = crypto.randomBytes(3);
  let random = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < 3; i++) {
    random += chars[bytes[i] % chars.length];
  }
  return `P${prefix}${year}${random}`;
}

/**
 * Gera codigo unico de validacao no formato VAL-XXXXXX
 */
export function generateValidationCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return `VAL-${code}`;
}

/**
 * Gera token para reset de senha
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
