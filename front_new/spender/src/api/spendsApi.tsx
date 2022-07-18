import { BACK_URL } from '../constants';
import ISpent from '../business/SpentInterface';

const spendsUrl = 'Spent';

export default class spendsApi {
    apiUrl = BACK_URL + spendsUrl;

    errorHandler: any;
    axios;

    constructor(errorHandler = null) {
        this.axios = require('axios').default;
        this.errorHandler = errorHandler;
    }
    
    async fetchAll() : Promise<ISpent[]> {
        var that = this.axios;
        const response = await this.axios.get(this.apiUrl + '/get').catch(function (error: any) {
            console.log(error);
            if (that.errorHandler) {
                that.errorHandler();
            }
        });

        return response.data;
    }

   async delete(id: number) : Promise<boolean> {
    var that = this.axios;
        await this.axios.post(this.apiUrl + '/delete', {id}).catch(function (error: any) {
            console.log(error);
            if (that.errorHandler) {
                that.errorHandler();
            }

            return false;
        });

        return true;
   }

   async edit(item: ISpent) : Promise<boolean> {
        var that = this.axios;
        
        await this.axios.post(this.apiUrl + '/edit', item, {
            'content-type': 'text/json;charset=utf-8'
        }).catch(function (error: any) {
            console.log(error);
            if (that.errorHandler) {
                that.errorHandler();
            }

            return false;
        });

        return true;
   }

   async create(item: ISpent) : Promise<boolean> {
    var that = this.axios;

    await this.axios.post(this.apiUrl + '/create', item, {
            'content-type': 'text/json;charset=utf-8'
        }).catch(function (error: any) {
        console.log(error);
        if (that.errorHandler) {
            that.errorHandler();
        }

        return false;
    });

    return true;
}
}