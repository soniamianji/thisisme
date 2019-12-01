import {
    CARD_SEARCH_RESULTS_ASYNC,
    SEARCH_MSG,
    JOB_SEARCH_RESULTS_ASYNC,
    CLEAR_SEARCH_RESULT,
    JOB_SEARCH_FROM_ARBETS_ASYNC
} from "./types";
import {
    githubBaseUrl, description, location,
    arbetsBaseUrl, searchUrl, queryBy
} from "../constantNames/api"
import searchCards from "../SDK/searchCards";


function cardSerachResultsAsync(cards) {
    return {
        type: CARD_SEARCH_RESULTS_ASYNC,
        cards
    };
}

function cardSearchResults(name) {
    return dispatch => {
        searchCards.searchCards(name).then(cards =>
            cards.length === 0
                ? dispatch(
                    searchMsg({
                        msg: "There are no cards with those search terms."
                    })
                )
                : dispatch(cardSerachResultsAsync(cards))
        );
    };
}

function searchMsg(msg) {
    return {
        type: SEARCH_MSG,
        msg
    };
}

function JobSearchResultsAsync(jobs) {
    return {
        type: JOB_SEARCH_RESULTS_ASYNC,
        jobs
    }
}

function JobSearchResults(desc, loc) {
    console.log("fetching from arbets")
    return dispatch => {
        fetch(githubBaseUrl + description + desc + location + loc, {
            headers: {
                Accept: "application/json"
            }
        }).then(res => res.json()).then(jobs =>
            jobs.length === 0
                ? dispatch(
                    searchMsg({
                        msg: "There are no jobs with those search terms."
                    })
                )
                :
                dispatch(JobSearchResultsAsync(jobs))
        )
    }
}



function JobSearchFromArbetsformedlingenAsync(jobs) {
    console.log(jobs)
    return {
        type: JOB_SEARCH_FROM_ARBETS_ASYNC,
        jobs
    }
}

function JobSearchFromArbetsformedlingen(desc, loc) {
    console.log(`${process.env.REACT_APP_KEY}`);
    return dispatch => {
        fetch(arbetsBaseUrl + searchUrl + desc + queryBy + loc, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "api-key": `${process.env.REACT_APP_KEY}`
            }
        }).then(res => res.json()).then(jobs =>
            jobs.length === 0
                ? dispatch(
                    searchMsg({
                        msg: "There are no jobs with those search terms."
                    })
                )
                :
                dispatch(JobSearchFromArbetsformedlingenAsync(jobs))
        )
    }
}


function clearSearchResult() {
    return {
        type: CLEAR_SEARCH_RESULT
    }
}

export {
    searchMsg,
    cardSearchResults,
    cardSerachResultsAsync,
    JobSearchResults,
    JobSearchResultsAsync,
    clearSearchResult,
    JobSearchFromArbetsformedlingen

}
