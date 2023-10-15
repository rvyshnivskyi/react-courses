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
        }).then(response => {
            if (response.ok) { // 200-299
                return response.json() // Promise
            }

            throw new Error(response.statusText)
        })
    }

    create = (data: T) => this.request('', 'POST', data);

    update = (id: number, data: T) => this.request('/' + String(id), 'PUT', data)

    // delete method
    delete = (id: number) => this.request('/' + String(id), 'DELETE')

    getList = () => this.request()
        .catch((e) => Promise.reject(Error(`Can't fetch list from server: ${e.message}`)));
}