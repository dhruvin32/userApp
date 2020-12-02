export class User{
    firstName: string;
    addedStatus: string;
    //middleName: string;
    //lastName: string;

    constructor(fname:string,status:string){
        this.firstName = fname;
        this.addedStatus = status;
    }
}