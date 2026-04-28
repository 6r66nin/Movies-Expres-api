export const urlNotFound = (req, res) => {
    res.status(404).send("The requested URL was not found");
};
