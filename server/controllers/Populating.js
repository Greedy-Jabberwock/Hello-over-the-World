import axios from "axios";
import dotenv from "dotenv";
import Cities from "../model/Cities.js";
import Countries from "../model/Countries.js";

dotenv.config();

export const populateCountries = async (req, res) => {
    // try {
        // const options = {
        //     method: 'GET',
        //     url: 'https://countries-cities.p.rapidapi.com/location/country/list',
        //     headers: {
        //       'X-RapidAPI-Key': process.env.CITIES_API_TOKEN,
        //       'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
        //     }
        // };

        // const responce = await axios.request(options);
        // console.log(responce.data.countries);

        // Object.entries(responce.data.countries).forEach(async item => {
        //     const code = item[0];
        //     const name = item[1];

        //     await Countries.create(
        //         {
        //             code,
        //             name
        //         },
        //         {
        //             fields: ["country_id", "code", "name"],
        //             returning: ["code", "name"]
        //         }
        //     )
        // })

    //     res.json({msg: 'ok'})
    // } catch (error) {
    //     res.status(404).json({msg: error})
    // }
    res.send('Already populated')
}

const getCitiesFromCountry = async (country_code, population) => {
    try {
        const url = `https://countries-cities.p.rapidapi.com/location/country/${country_code}/city/list`
        const popul = `${population}`
        const options = {
            method: 'GET',
            url,
            params: {page: '1', per_page: '20', population: popul},
            headers: {
            'X-RapidAPI-Key': process.env.CITIES_API_TOKEN,
            'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
            }
    };
    const responce = await axios.request(options);
    return responce.data.cities;
    } catch (error) {
        console.log(`No city found in ${country_code}`);
        return []
    }
}

const saveCitiesInDB = async (cities) => {
    cities.forEach(async city => {
        const {name, longitude, latitude} = city;
        const country = await Countries.findAll({
            where: {
                code: city.country.code
            },
            attributes: ['country_id', 'code', 'name']
        });
        const fk_country_id = country[0].dataValues.country_id;
        const record = {name, latitude, longitude, fk_country_id};
        setTimeout(async () => {
            
            console.log(record);
            // await Cities.create(
            //     record,
            //     {
            //         fields: [
            //             "city_id", 
            //             "name", 
            //             "latitude", 
            //             "longitude", 
            //             "fk_country_id"],
            //         returning: ['city_id']
            //     }
            // )
        }, 1500)
    })
}

// NEED: find the way to fetch API with interval to prevent too many requests error
export const populateCities = async (req, res) => {
    try {
        const countries = await Countries.findAll(
            {attributes: ['country_id', 'code', 'name']}
        );
        let counter = 60;
        const timer = setInterval(async () => {
            const country_code = countries[counter].code;
            console.log(counter + 1, ": ", country_code);
            // Preventing random use
            // const citiesInCountry = await getCitiesFromCountry(country_code, 10000);
            // await saveCitiesInDB(citiesInCountry);

            counter++;

            if (counter == 140) {
                clearInterval(timer);
            }
        }, 4000);
        

        res.json('ok');
    } catch (error) {
        res.status(404).json({msg: error})
    }
}