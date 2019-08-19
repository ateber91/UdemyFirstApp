export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExperationDate: Date) {

    }

    public get token(): string {
        if (!this._tokenExperationDate || new Date() > this._tokenExperationDate) {
            return null;
        }
        console.log('token: ' + this._token);
        return this._token;

    }
}
