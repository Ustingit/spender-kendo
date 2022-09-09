import { BACK_URL } from '../constants';
import SpendContext from '../business/SpendContextInfo';
import StatisticsDto from '../business/SpendStatistics';

const contextUrl = 'Types';

export default class contextApi {
    apiUrl = BACK_URL + contextUrl;

    errorHandler: any;
    axios;

    constructor(errorHandler = null) {
        this.axios = require('axios').default;
        this.errorHandler = errorHandler;
    }
    
    async fetchContext() : Promise<SpendContext> {
        var that = this.axios;
        const response = await this.axios.get(this.apiUrl + '/getCombinedTypes').catch(function (error: any) {
            console.log(error);
            if (that.errorHandler) {
                that.errorHandler();
            }

            return undefined;
        });

        const statistics = response.data.statistics as StatisticsDto;
        return new SpendContext(response.data.types, response.data.subTypes, response.data.directions, 
            response.data.defaultType, response.data.defaultSubType, response.data.defaultDirection, statistics);
    }
}