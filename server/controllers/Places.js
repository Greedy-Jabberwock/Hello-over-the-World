import Countries from "../model/Countries.js";
import Cities from "../model/Cities.js";

export const getCountries = async (req, res) => {
    try {
        const countries = await Countries.findAll(
            {attributes: ['country_id', 'code', 'name']}
        );
        res.json(countries);
    } catch (error) {
        res.status(404).json({msg: error});
    }
};

export const getCities = async (req, res) => {
    try {
        const cities = await Cities.findAll(
            {attributes: ['city_id', 'name', 'latitude', 'longitude', "fk_country_id"]}
        );
        res.json(cities);
    } catch (error) {
        res.status(404).json({msg: error});
    }
}


