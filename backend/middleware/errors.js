export const errorHandler = (err, request, response, next) => {
    console.error(err.message);

    if(err.name === "CastError") {
        return response.status(400).send({error: "malformatted id"});
    }

    next(err);
}