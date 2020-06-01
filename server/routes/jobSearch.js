const express = require("express");
const router = new express.Router();
const api = require("../constantNames/api")
const fetch = require('node-fetch');
const { afApiKey } = require("../confiq/conf")

//main object for every job ad
let jobObj = {
    id: "",
    title: "",
    employer: "",
    applicationDeadline: "",
    publicationDate: "",
    description: "",
    application_details: "",
    working_hours_type: "",
    city: "",
    country: "",
    employment_Type: "",
    webpage_url: "",
    company_Logo: "",
    source: "",
    source_url: "",
    apply_here: ""
}

router.post("/", (req, res) => {
    const title = req.body.title;
    const location = req.body.location;
    let AFJobs = [];
    let GHjobs = [];
    let minucipalityConceptId = ""
    let countryConceptId = ""
    //first get the taxanomy for the location
    fetch("https://jobsearch.api.jobtechdev.se/taxonomy/search?q=" + encodeURIComponent(location.split(",")[0]), {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "api-key": `${afApiKey}`
        }
    }).then(res => res.json()).then(
        function (taxonomy) {

            if (taxonomy.result.length !== 0) {
                for (var b = 0; b < taxonomy.result.length; b++) {
                    if (taxonomy.result[b].type === "municipality") {
                        minucipalityConceptId = taxonomy.result[b].conceptId;
                    }
                    if (taxonomy.result[b].type === "country") {
                        countryConceptId = taxonomy.result[b].conceptId;
                    }
                }
            }
            //console.log(minucipalityConceptId);
            //console.log(countryConceptId);
            //pass the conceptid of the locations to the search params get the result
            return fetch("https://jobsearch.api.jobtechdev.se/search?municipality=" + minucipalityConceptId + "&q=" + title, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "api-key": `${afApiKey}`
                }
            }).then(res => res.json()).then(function (jobs) {

                if (jobs.hits.length > 0) {
                    for (var i = 0; i < jobs.hits.length; i++) {
                        jobObj = {
                            id: jobs.hits[i].id,
                            title: jobs.hits[i].headline,
                            employer: jobs.hits[i].employer.name,
                            applicationDeadline: jobs.hits[i].application_deadline,
                            publicationDate: jobs.hits[i].publication_date,
                            description: jobs.hits[i].description.text,
                            working_hours_type: jobs.hits[i].working_hours_type.label,
                            city: jobs.hits[i].workplace_address.municipality,
                            country: jobs.hits[i].workplace_address.country,
                            employment_Type: jobs.hits[i].employment_type.label,
                            webpage_url: jobs.hits[i].employer.url,
                            company_Logo: jobs.hits[i].logo_url,
                            source: "arbetsFörmedlingen",
                            source_url: jobs.hits[i].webpage_url,
                            apply_here: jobs.hits[i].application_details.url
                        }
                        //  console.log(jobs.hits[i].workplace_address.municipality)
                        AFJobs.push(jobObj);
                    }
                }

                return fetch("https://jobs.github.com/positions?description=" + title + "&location=" + encodeURIComponent(location) + ".json", {
                    method: 'GET',
                    headers: {
                        Accept: "application/json"
                    }
                }).then(res => res.json()).then(function (jobs) {
                    if (jobs.length > 0) {
                        for (var i = 0; i < jobs.length; i++) {
                            jobObj = {
                                id: jobs[i].id,
                                title: jobs[i].title,
                                employer: jobs[i].company,
                                applicationDeadline: "",
                                publicationDate: jobs[i].created_at,
                                description: jobs[i].description,
                                working_hours_type: jobs[i].type,
                                city: jobs[i].location.split(",")[0],
                                country: jobs[i].location.split(",")[1],
                                employment_Type: jobs[i].type,
                                webpage_url: jobs[i].company_url,
                                company_Logo: jobs[i].company_logo,
                                apply_here: jobs[i].how_to_apply,
                                source: "github",
                                source_url: jobs[i].url
                            }
                            GHjobs.push(jobObj);
                        }
                    }
                    var alldata = AFJobs.concat(GHjobs);
                    res.status(200).json({ data: alldata });
                }
                ).catch(error => res.status(500).json(error))
            }).catch(error => res.status(500).json(error))

        }
    ).catch(error => res.status(500).json(error))

})
//get jobs both from github and arbetsformedlingen
router.get("/", (req, res) => {
    if (req.query.id) {
        const jobId = req.query.id;
        const source = req.query.source;
        if (source === "arbetsFörmedlingen") {
            fetch("https://jobsearch.api.jobtechdev.se/ad/" + jobId, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "api-key": `${afApiKey}`
                }
            }).then(res => res.json()).then(function (job) {
                jobObj = {
                    id: job.id,
                    title: job.headline,
                    employer: job.employer.name,
                    applicationDeadline: job.application_deadline,
                    publicationDate: job.publication_date,
                    description: job.description.text,
                    working_hours_type: job.working_hours_type.label,
                    city: job.workplace_address.municipality,
                    country: job.workplace_address.country,
                    employment_Type: job.employment_type.label,
                    webpage_url: job.employer.url,
                    company_Logo: job.logo_url,
                    source: "arbetsFörmedlingen",
                    source_url: job.webpage_url,
                    apply_here: job.application_details.url
                }
                res.status(200).json(jobObj)
            }
            ).catch(error => res.status(500).json(error))
        } else if (source === "github") {
            const jobId = req.query.id;
            fetch("https://jobs.github.com/positions/" + jobId + ".json", {
                method: 'GET',
                headers: {
                    Accept: "application/json"
                }
            }).then(res => res.json()).then(function (jobs) {
                jobObj = {
                    id: jobs.id,
                    title: jobs.title,
                    employer: jobs.company,
                    applicationDeadline: "",
                    publicationDate: jobs.created_at,
                    description: jobs.description,
                    working_hours_type: jobs.type,
                    city: jobs.location.split(",")[0],
                    country: jobs.location.split(",")[1],
                    employment_Type: jobs.type,
                    webpage_url: jobs.company_url,
                    company_Logo: jobs.company_logo,
                    apply_here: jobs.how_to_apply,
                    source: "github",
                    source_url: jobs.url
                }
                res.status(200).json(jobObj)
            }).catch(error => res.status(500).json(error))

        }
    }
});

module.exports = router;