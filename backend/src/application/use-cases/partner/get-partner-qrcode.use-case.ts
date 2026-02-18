import { prisma } from '../../../infrastructure/database/prisma';
import { AppError } from '../../../shared/errors/AppError';
import QRCode from 'qrcode';

export async function getPartnerQrCodeUseCase(partnerUserId: string) {
  // Buscar parceiro atraves do PartnerUser
  const partnerUser = await prisma.partnerUser.findUnique({
    where: { id: partnerUserId },
    include: { partner: true },
  });

  if (!partnerUser) {
    throw AppError.notFound('Parceiro nao encontrado');
  }

  const partner = partnerUser.partner;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const validationUrl = `${frontendUrl}/validar/${partner.partnerCode}`;

  // Gerar QR code como data URL
  const qrCodeDataUrl = await QRCode.toDataURL(validationUrl);

  // Se o parceiro ainda nao tem qrCodeUrl salvo, gerar e salvar
  if (!partner.qrCodeUrl) {
    await prisma.partner.update({
      where: { id: partner.id },
      data: { qrCodeUrl: qrCodeDataUrl },
    });
  }

  return {
    partnerCode: partner.partnerCode,
    qrCodeDataUrl,
    validationUrl,
  };
}
