export class CodeHelper {
  public static verificationCode(length: number = 6): string {
    const digits = "0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits.charAt(randomIndex);
    }

    return code;
  }
}
