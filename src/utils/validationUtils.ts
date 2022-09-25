export function validateEmail(email: string) {
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    return emailRegex.test(email);
}

export function validatePassword(password: string) {
    const passwordRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/);
    return passwordRegex.test(password) && password.length > 8;
}
