import Places from '../model/Places.js';
import Countries from '../model/Places.js';

export const getPlaces = async (req, res) => {
    try {
        const places = await Places.findAll();
        res.json(places);
    } catch (error) {
        res.status(400).send({msg: 'Smtng goes wrong'});
        console.log(error.message);
    }
};

export const createPlace = async (req, res) => {
    const { name, coordinates, country } = req.body;
    try {
        await Places.create(
            {
                name,
            }
        )
    } catch (error) {
        
    }
}