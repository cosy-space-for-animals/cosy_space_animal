export const validateEmail = (email: string): boolean => {
  // .com, .co.kr, .org, .net 으로 끝나는 도메인
  const emailRegex: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.kr|org|net)$/;

  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // 8자 이상, 영문, 숫자, 특수문자 포함
  const passwordRegex: RegExp =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|<>?]).{8,}$/;

  return passwordRegex.test(password);
};

export const validateUserName = (name: string): boolean => {
  // 한글만 입력 가능 (영어, 특수문자 포함 불가)
  const nameRegex: RegExp = /^[가-힣]+$/;

  return nameRegex.test(name);
};

export const restrictToNumbers = (string: string): string => {
  // 숫자만 입력 가능
  return string.replace(/[^0-9]/g, '');
};

/**
 * @description 객체를 깊은 복사합니다.
 * @param arg 복사할 객체
 * @returns 복사된 객체
 *
 * @example const copiedObject = generateDeepCopiedObject(originalObject);
 */
export const generateDeepCopiedObject = <T extends {}>(arg: T): T => {
  if (window.structuredClone) {
    return window.structuredClone(arg);
  }
  // 객체를 깊은 복사 합니다.
  return JSON.parse(JSON.stringify(arg));
};

/**
 * @description 클립보드에 텍스트를 복사합니다.
 * @param text
 *
 * @example copyToClipboard('test');
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }

  copyToClipboardFallback(text);
};

const copyToClipboardFallback = (text: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

/**
 * @description 숫자를 소숫점 + 한글표기로 변경.
 *
 * @param num 숫자
 * @param digits 소숫점 자리수
 * @param localization 한글 표기
 * @returns {string}
 *
 * @example convertUnit(213500) // 21.3만
 */

type TLocalization = 'kr' | 'en';

export function convertUnit(
  num: number,
  digits: number = 1,
  localization: TLocalization = 'kr',
): string {
  const unitsKR = ['', '만', '억', '조', '경', '해'];
  const unitsEN = ['', 'K', 'M', 'B', 'T', 'Q'];

  let unitIndex = 0;
  let convertedNum = num;

  // convertedNum 을 버림 처리하면서 unitIndex 를 증가시킵니다.
  while (convertedNum >= 10000) {
    if (localization === 'kr') {
      convertedNum /= 10000;
    } else {
      convertedNum /= 1000;
    }
    unitIndex++;
  }

  // 소숫점 자리수 만큼 버림 처리
  const factor = Math.pow(10, digits);
  convertedNum = Math.floor(convertedNum * factor) / factor;

  if (convertedNum % 1 === 0) {
    digits = 0;
  }

  const unit = localization === 'kr' ? unitsKR : unitsEN;

  return `${convertedNum.toFixed(digits)}${unit[unitIndex]}`;
}

/**
 * @description 단어에 한글 받침이 있는지 체크합니다. (이 함수는 조사를 구하는 등의 함수에서 사용합니다.)
 *
 * @param word 단어
 * @returns {boolean}
 *
 * @example hasFinalConsonant("몽구")
 */

function hasFinalConsonant(word: string): boolean {
  if (typeof word !== 'string') return false;

  const lastLetter = word.charAt(word.length - 1);
  const uni = lastLetter.charCodeAt(0);

  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;

  if (uni < HANGUL_START || uni > HANGUL_END) return false;

  return (uni - HANGUL_START) % 28 !== 0;
}

/**
 * @description 단어에 알맞은 조사를 반환합니다.
 *
 * @param word 단어
 * @returns {'와' | '과'}
 *
 * @example getKoreanConnectiveParticle("몽구")
 */

export function getKoreanConnectiveParticle(word: string): '와' | '과' {
  return hasFinalConsonant(word) ? '과' : '와';
}

/**
 * @description 단어에 알맞은 조사를 반환합니다.
 *
 * @param word 단어
 * @returns {'이' | '가'}
 *
 * @example getKoreanSubjectMarker("몽구")
 */

export function getKoreanSubjectMarker(word: string): '이' | '가' {
  return hasFinalConsonant(word) ? '이' : '가';
}

/**
 * @description 단어에 알맞은 조사를 반환합니다.
 *
 * @param word 단어
 * @returns {'을' | '를'}
 *
 * @example getKoreanObjectParticle("몽구")
 */

export function getKoreanObjectParticle(word: string): '을' | '를' {
  return hasFinalConsonant(word) ? '을' : '를';
}

export function setItemWithExpireDate(
  key: string,
  value: string,
  days: number = 30,
) {
  const obj = { value, expire: Date.now() + days * 86400000 };
  const objString = JSON.stringify(obj);
  localStorage.setItem(key, objString);
}

export function getItemWithExpireDate(key: string) {
  const objString = window.localStorage.getItem(key);
  if (!objString) return null;

  const obj = JSON.parse(objString);

  if (Date.now() > obj.expire) {
    localStorage.removeItem(key);
    return null;
  }
  return obj.value;
}

export const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires};`;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }

  return null;
};

type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD hh:mm:ss' | 'YY-MM-DD' | 'YY-MM-DD hh:mm:ss' | 'MM-DD' | 'MM-DD hh:mm:ss' | string;
type DateFormat = 'YYYY-MM-DD' | 'YYYY-MM-DD hh:mm:ss' | 'YY-MM-DD' | 'YY-MM-DD hh:mm:ss' | 'MM-DD' | 'MM-DD hh:mm:ss' | 'kr';

/**
 * @description 날짜를 포맷에 맞게 변환합니다.
 * @param date
 * @param format
 * @param defaultValue
 */
export function formatDate(date: string | number | Date, format: DateFormat, defaultValue: string = ''): string {
  if (!date) return defaultValue;
  date = new Date(date);
  const pad = (num: number) => (num < 10 ? '0' + num : num);

  // 연도는 두 글자만 사용
  const yearFull = date.getFullYear();
  const year = yearFull.toString().substr(-2); // 연도의 마지막 두 자리
  const month = pad(date.getMonth() + 1); // 월은 0부터 시작하므로 +1이 필요합니다.
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  if (format === 'YYYY-MM-DD') return `${yearFull}-${month}-${day}`;
  if (format === 'YYYY-MM-DD hh:mm:ss') return `${yearFull}-${month}-${day} ${hour}:${minute}:${second}`;
  if (format === 'YY-MM-DD') return `${year}-${month}-${day}`;
  if (format === 'YY-MM-DD hh:mm:ss') return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  if (format === 'MM-DD') return `${month}-${day}`;
  if (format === 'MM-DD hh:mm:ss') return `${month}-${day} ${hour}:${minute}:${second}`;

  return format
    .replace(/YYYY/g, yearFull.toString())
    .replace(/EE/g, year)
    .replace(/MM/g, month.toString())
    .replace(/DD/g, day.toString())
    .replace(/hh/g, hour.toString())
    .replace(/mm/g, minute.toString())
    .replace(/ss/g, second.toString());
}
