import {sign, SignOptions, verify, VerifyOptions} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */
export function generateToken(payloadObject: any, duration='5h') {
    // information to be encoded in the JWT
    const payload = {
        payloadObject
    };

    const privateKey = {
        key: fs.readFileSync(path.join(__dirname, '../../private.pem'), 'utf8'),
        passphrase: "topman"
    };

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: duration
        // expiresIn: '20000'
    }

    return sign(payload, privateKey, signInOptions);
}


/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
export function validateToken(token: string): Promise<any> {
    const publicKey = fs.readFileSync(path.join(__dirname, './../../public.pem'));

    const verifyOptions: VerifyOptions = {
        algorithms: ['RS256'],
    };

    return new Promise((resolve, reject) => {
        verify(token,publicKey,verifyOptions,(error, decoded) => {
            if (error) return reject(error)
            resolve(decoded);
        })
    });
}