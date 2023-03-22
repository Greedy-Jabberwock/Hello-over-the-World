import Place from '../model/Place.js'
import { Op } from 'sequelize';

export const getPlaces = async (req, res) => {
    try {
        const places = await Place.findAll();
        res.json(places)
    } catch (error) {
        res.status(404).send(error)
    }
};

export const addPlace = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;
        const place = await Place.findOne({
            where: {
                [Op.and] : [
                    { name }, 
                    { latitude },
                    { longitude }
                ]
            }
        });
        if (place) throw new Error('That place already exist in database');

        const new_place = {name, latitude, longitude}

        await Place.create(new_place);
        
        res.json({msg: `Place ${name} added to database`})

    } catch (error) {
        res.status(418).json({msg: error.message});
    }
};

