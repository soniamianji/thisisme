import {
    CARD_SEARCH_RESULTS_ASYNC,
    SEARCH_MSG,
    JOB_SEARCH_RESULTS_ASYNC,
    CLEAR_SEARCH_RESULT,
    PROFILE_JOB_SEARCH_RESULTS_ASYNC,
} from "./types";
import searchCards from "../SDK/searchCards";
import { jobSearch } from "../SDK/jobSearch";


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

function JobSearchResults(desc, loc, cb) {
    return dispatch => {
        jobSearch(desc, loc).then(jobs => {
            cb();
            dispatch(JobSearchResultsAsync(jobs))
            localStorage.setItem("jobs", JSON.stringify(jobs))

        }
        )
    }
}

function profileJobSearchAsync(jobs) {
    return {
        type: PROFILE_JOB_SEARCH_RESULTS_ASYNC,
        jobs
    }
}

function profileJobSearch(desc, loc, cb) {
    return dispatch => {
        jobSearch(desc, loc).then(jobs => {
            cb();
            dispatch(profileJobSearchAsync(jobs))
            localStorage.setItem("profilejobs", JSON.stringify(jobs))
        }
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
    profileJobSearch,
    profileJobSearchAsync

}
