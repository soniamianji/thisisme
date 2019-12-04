const sendRequest = require("./sendRequests");

const jobSearch = async function (title, location, callback) {
    let response;
    let body = {
        title: title,
        location: location
    }

    try {
        response = await sendRequest.sendRequest(
            "POST",
            "/jobSearch", body
        );
    } catch (errors) {
        console.log(errors)
        return;
    }

    let errors = [];
    let jobs = [];

    switch (response.status) {
        case 200:
            jobs = response.json();
            break;

        case 500:
            errors = ["backendError"];
            break;

        default:
            errors = ["unknown status code"];
    }
    console.log(errors)

    return jobs;
};

const jobSearchById = async function (id, source, callback) {
    let response;

    try {
        response = await sendRequest.sendRequest(
            "GET",
            "/jobSearch?id=" + id + "&source=" + source
        );
    } catch (errors) {
        console.log(errors)
        return;
    }

    let errors = [];
    let job;

    switch (response.status) {
        case 200:
            job = response.json();
            break;

        case 500:
            errors = ["backendError"];
            break;

        default:
            errors = ["unknown status code"];
    }
    console.log(errors)

    callback(errors, job)
};
export { jobSearchById, jobSearch }