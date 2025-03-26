import {config} from "../utils/constants";
import {request} from "../utils/request";

export const getAgencyRequestStatus = () => {
    return request({
        url: `${config.agencyRequestStatusPickListEndPoint}`,
        method: 'get'
    });
}

export const getAgencyRequests = (aggregationTerms = "", searchKeyword = "") => {

    let search = searchKeyword && searchKeyword.length > 0 ? ` and (contains(subject,'${searchKeyword}') or contains(message,'${searchKeyword}'))` : "";
    let filter = (searchKeyword) && `&filter=(${search})`;
    let aggregate = aggregationTerms && `&aggregationTerms=${aggregationTerms}`;

    // filter = ""

    console.log(filter)

    return request({
        // url: `${config.agencyRequestsEndPoint}${config.scopeIdEndPoint}?page=0${filter}${aggregate}`,
        url: `${config.agencyRequestsEndPoint}?page=0${filter}${aggregate}`,
        method: "get",
    })
}


export const getAgencyRequest = (id) => {
    return request({
        url: `${config.agencyRequestsEndPoint}/${id}`,
        method: 'get'
    })
}