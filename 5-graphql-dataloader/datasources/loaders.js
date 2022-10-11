const DataLoader = require('dataloader');

const rocketsLoader = (rocketsReporsitory) => {
    const loader = new DataLoader(async (keys) => {
        const rockets = await rocketsReporsitory.getByIds(keys);
        return keys.map(key => {
            const rocket = rockets.find(({id}) => id === key);
            if(rocket){
                return rocket;
            }
            return new Error(`No result for ${key}`);
        });
    });
    return loader;
};

const launchesByRocketLoader = (launchesRepository) => {
    return new DataLoader(async (ids) => {
      const launches = await launchesRepository.getLaunchesByRocketIds(ids);
      const data = ids.map(id => launches.filter( launche => launche.rocket === id));
      return data;
    });
  }

module.exports = {
    rocketsLoader,
    launchesByRocketLoader
};