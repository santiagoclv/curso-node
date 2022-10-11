const { RESTDataSource } = require('apollo-datasource-rest');

const { performanceLogger } = require('../utils/performanceLogger');

class SpacexAPI extends RESTDataSource {

    constructor(){
        super();
        this.baseURL = 'https://api.spacexdata.com/v4';
    }

    async getCompanyInfo(){
        const data = await this.get('/company');
        return data;
    }

    async getLaunches(){
        const data = await performanceLogger(() => this.get(`/launches`), 'SpacexAPI.getLaunches API call');
        return data;
    }

    async getLaunchById(id){
        const data = await this.get(`/launches/${id}`);
        return data;
    }

    async getLaunchesByRocketId(id){
        const { docs } = await performanceLogger(() => this.post(`/launches/query`, {
            query: {
                rocket: id
            }
        }), 'SpacexAPI.getLaunchByRocketId API call');
        return docs;
    }

    async getLaunchesByRocketIds(ids){
        const { docs } = await performanceLogger(() => this.post(`/launches/query`, {
            query: {
                rocket: {
                  $in: ids
                }
              }
        }), 'SpacexAPI.getLaunchesByRocketIds API call');
        return docs;
    }

}

module.exports = SpacexAPI;