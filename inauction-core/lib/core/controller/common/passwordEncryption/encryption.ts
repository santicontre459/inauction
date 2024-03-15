import * as bcrypt from "bcryptjs";

export class PasswordEncryption {
    public static hashPassword(password: string) {
        return bcrypt.hashSync(password, 8);
    }

   public static checkIfUnencryptedPasswordIsValid(unencryptedPassword: string, encryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, encryptedPassword);
      }
}