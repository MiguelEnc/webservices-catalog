const HTTPCaller = () => {
    const httpCall = async <T>(request: RequestInfo): Promise<T> => {
        const response = await fetch(request);
        const body = await response.json();
        return body;
    };

    const get = async <T>(path: string): Promise<T> => {
        const args: RequestInit = {
            method: 'get'
        };

        return await httpCall(new Request(path, args));
    };

    const post = async <T>(path: string, body: any): Promise<T> => {
        const args: RequestInit = {
            method: 'post',
            body: JSON.stringify(body)
        };

        return await httpCall(new Request(path, args));
    };

    const put = async <T>(path: string, body: any): Promise<T> => {
        const args: RequestInit = {
            method: 'put',
            body: JSON.stringify(body)
        };

        return await httpCall(new Request(path, args));
    };

    const makeDelete = async <T>(path: string): Promise<T> => {
        const args: RequestInit = {
            method: 'delete'
        };
        return await httpCall(new Request(path, args));
    };

    return {
        get,
        post,
        put,
        delete: makeDelete
    };
};

export default HTTPCaller();
