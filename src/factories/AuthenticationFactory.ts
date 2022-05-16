import axios from "axios";

export default class AuthenticationFactory {
    public static createToken(authcode: string): Promise<void> {
        return axios.post('tokens', {authorization_code: authcode}).then((response: any) => {
            localStorage.setItem('token', response.data.token);
        });
    }
}