/*
 * @Author: 琪琪格
 * @Date: 2019-11-25 12:53:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-25 15:15:27
 */
//
import Vue from 'vue';

/**
 *
 * 手机号码加星号
 * @export
 * @param {number} mobile - 手机号码 - 例：13606006000
 * @returns {*} - 例：136****6000
 */
export function asteriskMobile(mobile: number): any {
  if (mobile) {
    const mobileReg: string = mobile.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    return mobileReg;
  }
}

/**
 *
 * 验证邮箱
 * @export
 * @param {number} email - 邮箱地址 - 例：1000@qq.com
 * @returns {boolean} - 返回判断结果
 */
export function emailCheck(email: string): boolean {
  const emailReg: any = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if (!emailReg.test(email)) {
    return false;
  } else {
    return true;
  }
}

/**
 *
 * 验证手机号码
 * @export
 * @param {*} mobile  - 手机号码 - 例：13606006000
 * @returns {boolean}  - 返回判断结果
 */
export function phoneNumCheck(mobile: any): boolean {
  const mobileReg: any = /^1[3456789]\d{9}$/;
  if (!mobileReg.test(mobile)) {
    return false;
  } else {
    return true;
  }
}

// 设置localStorage
export function setLocalStorage(key: string, value: any) {
  if (!key) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  if (Vue.prototype.appGlobal) {
    api.setPrefs({
      key: key,
      value: value
    });
  } else {
    window.localStorage.setItem(key, value);
  }
}

// 获取localStorage
export function getLocalStorage(key: any): any {
  if (!key) return;
  if (Vue.prototype.appGlobal) {
    let val = api.getPrefs({
      sync: true,
      key: key
    });
    return val
  } else {
    let val = window.localStorage.getItem(key);
    return val
  }
}

// 删除localStorage
export function removeLocalStorage(key: any): void {
  if (!key) return;
  if (Vue.prototype.appGlobal) {
    api.removePrefs({
      key: key
    });
  } else {
    window.localStorage.removeItem(key);
  }

}
