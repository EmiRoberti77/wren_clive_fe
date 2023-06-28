import * as CryptoJS from 'crypto-js';

export class AutthEncrypt {
  private SECRET: string = 'CR77';

  encryptString(text: string): string {
    return CryptoJS.AES.encrypt(text, this.SECRET).toString();
  }

  decryptString(text: string): string {
    const bytes = CryptoJS.AES.decrypt(text, this.SECRET);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
