import { InvalidPhoneNumber } from "@/services/errors/invalid-phone-number.js";

export function validateOrgPhoneNumber(phone: string): string {
  const numbers = phone.replace(/\D/g, "");

  if (!/^[1-9]\d{11,14}$/.test(numbers)) {
    throw new InvalidPhoneNumber();
  }

  return numbers;
}
