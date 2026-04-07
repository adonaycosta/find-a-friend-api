interface whatsAppLinkParams {
  phone: string;
  petName: string;
}

export function buildWhatsAppLinkUrl({ phone, petName }: whatsAppLinkParams): string {
  const message = `Hello! i saw the pet ${petName}.`;

  const encodedMessage = encodeURIComponent(message);

  const whatsAppUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return whatsAppUrl;
}
