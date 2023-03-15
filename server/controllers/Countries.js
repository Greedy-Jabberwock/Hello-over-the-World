import axios from "axios";
import Countries from "../model/Countries.js";

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

export const populateCountries = async (req, res) => {
    // try {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://countries-cities.p.rapidapi.com/location/country/list',
    //         headers: {
    //           'X-RapidAPI-Key': 'b8b2df6cb6msh2e9a7070fa04175p136a03jsnb859331adff9',
    //           'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
    //         }
    //     };

    //     const responce = await axios.request(options);
    //     console.log(responce.data.countries);

    //     Object.entries(responce.data.countries).forEach(async item => {
    //         const code = item[0];
    //         const name = item[1];

    //         await Countries.create(
    //             {
    //                 code,
    //                 name
    //             },
    //             {
    //                 fields: ["country_id", "code", "name"],
    //                 returning: ["code", "name"]
    //             }
    //         )
    //     })

    //     res.json({msg: 'ok'})
    // } catch (error) {
    //     res.status(404).json({msg: error})
    // }
    res.send('Already populated')
}


// NEED: find the way to fetch API with interval to prevent too many requests error
export const populateCities = async (req, res) => {
    try {
        const countries = await Countries.findAll(
            {attributes: ['country_id', 'code', 'name']}
        );
        
        // countries.forEach(async country => {
            
        //     const data = {"country": countries[0].name.toLowerCase()};

        //     const config = {
        //     method: 'get',
        //     maxBodyLength: Infinity,
        //     url: 'https://georocket.net/api/cities',
        //     params: {
                
        //     },
        //     headers: { },
        //     data : data
        //     };

            

        // })

        res.json('ok');
    } catch (error) {
        res.status(404).json({msg: error})
    }
}
