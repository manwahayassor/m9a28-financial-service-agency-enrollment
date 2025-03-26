import React, {useEffect, useState} from "react";
import {getAgencyRequest, getAgencyRequests} from "../services/AgencyRequestServices";
import ClayIcon from '@clayui/icon';
import Button from '@clayui/button';
import DropDown from "@clayui/drop-down";

const AgencyRequestCreationButton = ({agencyRequestId, limit, displayPageTemplateId}) => {


    const [agencyRequests, setAgencyRequests] = useState(null);

    useEffect(() => {

        getAgencyRequests(agencyRequestId).then(response => {

            setAgencyRequests(response.items);

            console.log(response.items.length);

            console.log("limit " + limit);
        })

    }, [agencyRequestId]);

    return (
        <>
            {agencyRequests &&
                ((agencyRequests.length < limit) || limit === 0)
                && (
                    <div className="btn btn-primary"
                         onClick={() => window.location.pathname = `/web/banking/new-request`}>
                        New Request
                    </div>
                )
            }
        </>
    )
}

export default AgencyRequestCreationButton;