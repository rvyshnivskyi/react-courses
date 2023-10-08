export class FetchClient<T> {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    request = (path = '', method = 'GET', data?: T): Promise<any> => {
        return fetch(`${this.baseUrl}${path}`, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

    create = (data: T) => this.request('', 'POST', data);

    update = (id: number, data: T) => this.request('/' + String(id), 'PUT', data)

    // delete method
    delete = (id: number) => this.request('/' + String(id), 'DELETE')

    getList = () => this.request();
}