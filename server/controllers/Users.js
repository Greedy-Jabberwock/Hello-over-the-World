export const hello = (req, res) => {
    res.status(404).json({msg: 'Hello there'});
}