import data from "../../data/cities.json";

exports.handler = async function (event, context) {
    if (event.httpMethod === "GET") {
        if (event.queryStringParameters && event.queryStringParameters.id) {
            const cityIdToGet = event.queryStringParameters.id;
            const cityToGet = data.cities.find(
                (city) => Number(city.id) === Number(cityIdToGet)
            );
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, city: cityToGet }),
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify(data.cities),
            };
        }
    } else if (event.httpMethod === "POST") {
        // Handling POST request to add a city
        const requestBody = JSON.parse(event.body);
        const newCity = { ...requestBody, id: Date.now() }; // Adding a unique ID
        data.cities.push(newCity);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "City added successfully",
                newCity,
            }),
        };
    } else if (event.httpMethod === "DELETE") {
        // Handling DELETE request to delete a city
        const cityIdToDelete = event.queryStringParameters.id;
        const indexToDelete = data.cities.findIndex(
            (city) => Number(city.id) === Number(cityIdToDelete)
        );
        data.cities.splice(indexToDelete, 1);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "City deleted successfully",
            }),
        };
    }
};
