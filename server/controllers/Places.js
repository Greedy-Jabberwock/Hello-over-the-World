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

export const getCitiesInCountry = async (req, res) => {
    const countryCode = req.query.code;
    try {
        const country = await Countries.findAll(
            {   
                where: {
                    code: countryCode
                },
                attributes: ['country_id'],
                returning: ['country_id']
            }
        )
        const cities = await Cities.findAll({
            where: {
                fk_country_id: country[0].dataValues.country_id
            },
            attributes: ['name', 'latitude', 'longitude']
        });
        res.json(cities)
    } catch (error) {
        res.status(404).send(error)
    }
}

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


