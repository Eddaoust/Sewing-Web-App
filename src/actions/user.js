export const USER_AUTH = 'USER_AUTH';

export function userAuth(token) {
    return {
        type: USER_AUTH,
        data: token
    };
}