import {EnumType} from "./dbManaging/types";

export class EnumService {
  data: EnumType[] ;

  constructor(enumData: EnumType[]) {
    this.data = enumData;
  }

  getDisplay(key: string): string[]  {
    if (!key) { // @ts-ignore
      return '';
    }

    // @ts-ignore
    return this.data.find(e => e.key === key, {display: ''}).display;
  }

  getDisplayByValue(value: number): string[]  {
    // @ts-ignore
    return this.data.find(e => e.value === value, {display: ''}).display;
  }

  getKeyByValue(value: number): string[]  {
    // @ts-ignore
    return this.data.find(e => e.value === value, {key: ''}).key;
  }

  getValueByKey(key: string): string[]  {
    // @ts-ignore
    return this.data.find(e => e.key === key, {value: undefined}).value;
  }

  getKey(key: string): string[]  {
    // @ts-ignore
    return this.data.find(e => e.key === key);
  }

  getKeys() : string[] {
    // @ts-ignore
    return this.data.map(e => e.key);
  }

  findOne(exp: any) : string[] {
    if (typeof exp !== 'function')
      throw new Error('Argument is not valid');

    // @ts-ignore
    return this.data.find(exp);
  }
}
