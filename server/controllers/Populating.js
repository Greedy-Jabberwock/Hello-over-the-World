import axios from "axios";
import dotenv from "dotenv";
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

export const populateArticles = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}