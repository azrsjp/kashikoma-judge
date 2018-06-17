// localStrageを利用したセーブデータ置き場

const keyPrefix = '__KASHIKOMA_DETECTION__';

const trueString = 'true';
const falseString = 'false';

const keyForBoolExample = keyPrefix + 'boolExample';
const keyForNumberExample = keyPrefix + 'numberExample';

export class UserData {

    // bool値のスニペット
    static get boolExample(): boolean {
        return this.StringToBool(localStorage.getItem(keyForBoolExample));
    }
    static set boolExample(value: boolean) {
        localStorage.setItem(keyForBoolExample, this.BoolToString(value));
    }

    // 数値のスニペット
    static get numberExample(): number {
        return this.StringToNumber(localStorage.getItem(keyForNumberExample));
    }
    static set numberExample(value: number) {
        localStorage.setItem(keyForNumberExample, value.toString());
    }

    // private 
    private static StringToBool(trueOrFalse: string): boolean {
        return trueOrFalse == trueString;
    }

    private static BoolToString(trueOfFalse: boolean): string {
        return trueOfFalse ? trueString : falseString;
    }

    private static StringToNumber(number: string): number {
        const value = parseInt(number);
        return isNaN(value) ? 0 : value;
    }
}