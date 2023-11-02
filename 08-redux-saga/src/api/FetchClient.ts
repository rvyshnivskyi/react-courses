export class FetchClient<T> {

    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    request = async (path = '', method = 'GET', data?: T): Promise<any> => {
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

    create = async (data: T) => {
        try {
            return await this.request('', 'POST', data)
        } catch (e: any) {
            throw new Error(`Can't create item: ${e.message}`)
        }

    }

    update = async (id: number, data: T) => {
        try {
            return await this.request('/' + String(id), 'PUT', data)
        } catch (e: any) {
            throw new Error(`Can't update item: ${e.message}`)
        }
    }

    // delete method
    delete = async (id: number) => {
        try {
            return await this.request('/' + String(id), 'DELETE')
        } catch (e: any) {
            throw new Error(`Can't delete item: ${e.message}`)
        }
    }

    getList = async () => {
        try {
            return await this.request()
        } catch (e: any) {
            throw new Error(`Can't fetch list from server: ${e.message}`)
        }
    }

    getOne = async (id: string) => {
        try {
            return await this.request('/' + id)
        } catch (e: any) {
            throw new Error(`Can't fetch item from server: ${e.message}`)
        }
    }
}