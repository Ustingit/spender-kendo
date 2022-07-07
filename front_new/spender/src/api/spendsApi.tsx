import { BACK_URL } from '../constants';
import ISpent from '../business/SpentInterface';

const spendsUrl = 'Spent';

export default class spendsApi {
    errorHandler: any;
    axios;

    constructor(errorHandler = null) {
        this.axios = require('axios').default;
        this.errorHandler = errorHandler;
    }
    
    async fetchAll() : Promise<ISpent[]> {
        var that = this.axios;
        const response = await this.axios.get(BACK_URL + spendsUrl + '/get').catch(function (error: any) {
            console.log(error);

            if (that.errorHandler) {
                that.errorHandler();
            }
        });

        return response.data;
    }
}