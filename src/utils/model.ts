export interface IRegister {
    email: string;
    password: string;
    details: { firstName: string; lastName: string; occupation?: string; country?: string };
}
