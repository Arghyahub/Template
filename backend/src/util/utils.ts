import { hashSync } from "bcrypt";

class Util {
  static isNotNull(data: any, allowEmpty = false) {
    if (allowEmpty) {
      return data !== null && data !== undefined;
    } else {
      return data !== null && data !== undefined && data !== "";
    }
  }

  static nullValues(data: Record<any, any>, allowEmpty = false, pretty = true) {
    const result: string[] = [];
    for (const key of Object.keys(data)) {
      const isValid = this.isNotNull(data[key], allowEmpty);
      if (!isValid) {
        result.push(key);
      }
    }
    return result;
  }

  static hashPassword(password: string): string {
    const saltRounds = 10;
    return hashSync(password, saltRounds);
  }
}

export default Util;
