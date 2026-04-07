export class InvalidPhoneNumber extends Error {
  constructor() {
    super("Invalid WhatsApp number. Use country code + area code + number: 5511999999999.");
  }
}
