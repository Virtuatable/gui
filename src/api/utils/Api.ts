import axios from "axios"

export default class Api {
    private static baseUrl = "https://virtuatable-mock.herokuapp.com"

    public static get(path: string): Promise<any> {
        return axios.get(Api.path(path)).then((data: any) => data.data);
    }

    public static path(path: string): string {
        return `${Api.baseUrl}${path}`;
    }
}