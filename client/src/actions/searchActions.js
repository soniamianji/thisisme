import {
    CARD_SEARCH_RESULTS_ASYNC,
    SEARCH_MSG,
    JOB_SEARCH_RESULTS_ASYNC,
    CLEAR_SEARCH_RESULT
} from "./types";
import { githubBaseUrl, description, location } from "../constantNames/api"
import searchCards from "../SDK/searchCards";


function cardSerachResultsAsync(cards) {
    return {
        type: CARD_SEARCH_RESULTS_ASYNC,
        cards
    };
}

function cardSearchResults(occupation, name, location) {
    return dispatch => {
        searchCards.searchCards(occupation, name, location).then(cards =>
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
    console.log(jobs)
    return {
        type: JOB_SEARCH_RESULTS_ASYNC,
        jobs
    }
}

function JobSearchResults(desc, loc) {
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
    clearSearchResult

}
