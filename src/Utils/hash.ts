import * as crypto from 'crypto'

export function encryptPassword(password: string) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')

    return `${salt}:${hash}`
}

export function decryptedPassword(encryptedPassword: string, decryptedPassword: string) {
    const [salt, originalHash] = encryptedPassword.split(':');
    const hash = crypto.pbkdf2Sync(decryptedPassword, salt, 10000, 512, 'sha512').toString('hex');

    if (hash === originalHash) {
        return true;
    } else {
        return false;
    }
}