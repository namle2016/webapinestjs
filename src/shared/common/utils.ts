import bcrypt from 'bcrypt';
import { extname } from 'path';
import cryptoJs from 'crypto-js';
import { AppNotificationEnum } from './app-settings.enum';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''));

  if (!m) {
    throw new Error("The function does not contain a statement matching 'return variableName;'");
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

export function isUrlValid(url: string) {
  const res = url.match(/^https?:\/\/.+\.([^/]+)\/.*/);

  return res == null ? false : true;
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(5)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const randomArrayWithSum = (sum: number) => {
  if (sum <= 5) {
    return [sum];
  }
  const length = parseInt((Math.floor(Math.random() * 10) + sum / 2).toString(), 10);
  let result: number[] = [];
  for (var i = 0; i < length; i++) {
    const tmp = parseInt((Math.floor(Math.random() * 10) + 10).toString(), 10);
    if (sum < tmp) {
      result.push(sum);
      break;
    } else {
      sum -= tmp;
      result.push(tmp);
    }
  }
  return result.reverse();
};

export const convertToSlug = (text: string | undefined | null): string => {
  if (text) {
    let slug = '';
    slug += text
      .toLowerCase()
      .replace(/đ/g, 'd')
      .normalize('NFD')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .trim();
    if (slug !== '') {
      slug = slug + '-' + generateRandomCode(5, false).toLowerCase();
    } else {
      slug = generateRandomCode(5, false).toLowerCase();
    }
    return slug;
  }
  return generateRandomCode(5, false);
};

export const codeForSlug = (): string => {
  const now = new Date();
  let slug =
    `${now.getUTCDate()}${now.getUTCMonth() + 1}${now.getUTCFullYear() % 100}` +
    `${generateRandomCode(5, false)}-`;
  return slug;
};

export const generateRandomVouchersCode = (numberOfStrings: number, stringLength: number): string[] => {
  const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
  const strings: string[] = [];
  const key = generateRandomCode(3, false).toUpperCase();
  for (let i = 0; i < numberOfStrings; i++) {
    let randomString = '';
    for (let j = 0; j < stringLength; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    strings.push(key + '-' + randomString);
  }

  return strings;
};

export const generateRandomCode = (length: number, isOnlyNumber: boolean): string => {
  let characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
  if (isOnlyNumber) {
    characters = '0123456789';
  }
  let randomString = '';
  for (let j = 0; j < length; j++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

export const getStartDateOfWeek = (year: number, weekNumber: number) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const daysToAdd = (weekNumber - 1) * 7;
  const startDateOfWeek = new Date(firstDayOfYear);
  startDateOfWeek.setDate(firstDayOfYear.getDate() + daysToAdd + 1); // start at monday

  return startDateOfWeek;
};

// ENCRYPT
export const encryptCloudMediaKey = (key: string): string => {
  return cryptoJs.AES.encrypt(Date.now().toString(), key).toString();
};

export const encryptSocketToken = (userId: string, key: string): string => {
  return cryptoJs.AES.encrypt(Date.now().toString() + userId, key).toString();
};

export const encryptKey = (value: string, key: string): string => {
  return cryptoJs.AES.encrypt(value, key).toString();
};

// DECRYPT
export const validateCloudMediaKey = (decryptedText: string, key: string): boolean => {
  try {
    const decrypted = cryptoJs.AES.decrypt(decryptedText.replace(/ /g, '+'), key).toString(cryptoJs.enc.Utf8);
    const timestamp = parseInt(decrypted);

    if (isNaN(timestamp)) {
      return false;
    } else {
      const date1 = new Date(timestamp);
      const date2 = new Date(new Date().toUTCString());

      const timeDifference = Math.abs(date1.getTime() - date2.getTime());
      return timeDifference <= 180000; // 180000 milliseconds = 3 minutes
    }
  } catch (e) {
    return false;
  }
};

export const decryptKey = (decryptedText: string, key: string): string => {
  decryptedText = decryptedText.replace(/ /g, '+');
  return cryptoJs.AES.decrypt(decryptedText, key).toString(cryptoJs.enc.Utf8);
};

export const convertStringToArray = (str: string): string[] => {
  if (str) {
    const splitKey = '</br>';
    return str.split(splitKey);
  }
  return [];
};

export const convertArrayToString = (arr: string[]): string => {
  if (arr) {
    const splitKey = '</br>';
    let result = '';

    arr.forEach((e, index) => {
      // Check if the current element is the last element in the array
      if (index === arr.length - 1) {
        result += e;
      } else {
        result += `${e}${splitKey}`;
      }
    });
    return result;
  }
  return '';
};

export const getNewOrderCode = (count: number): string => {
  const now = new Date(Date.now());
  return `${now.getDate}${now.getMonth}${now.getFullYear}-${count}`;
};
 
export const getTransporterName = (email: string, password: string) => {
  return `smtp://${email}:${password}@smtp.gmail.com`;
};

export const getIconFromNotificationType = (notifyType: string) => {
  switch (notifyType) {
    case AppNotificationEnum.EMAIL:
      return 'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1703429867/email_whqsxq.svg';
    case AppNotificationEnum.INFO:
      return 'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1703429867/info_nbnl0g.svg';
    case AppNotificationEnum.WARNING:
      return 'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1703429867/warning_easn7t.svg';
    case AppNotificationEnum.ERROR:
      return 'https://res.cloudinary.com/dvv3iwbyz/image/upload/v1703429867/error_daseqm.svg';
    default:
      return notifyType;
  }
};
 
export const roundToTwoDecimalPlaces = (amount: number, discountPercentage: number) => {
  try {
    let numberToRound = amount;
    if (discountPercentage) {
      numberToRound = amount - (discountPercentage / 100) * amount;
    }
    const result = Number(numberToRound.toFixed(2));
    if (isNaN(result)) return 999999999;
    return result;
  } catch (e) {
    return 999999999;
  }
};
