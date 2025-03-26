import React, {useEffect, useState} from "react";
import {getAgencyRequest} from "../services/AgencyRequestServices";
import ClayIcon from '@clayui/icon';
import Button from '@clayui/button';
import DropDown from "@clayui/drop-down";

const AgencyRequestNavigation = ({agencyRequestId, displayPageTemplateId}) => {

    const [agencyRequest, setAgencyRequest] = useState(null);

    useEffect(() => {

        getAgencyRequest(agencyRequestId).then(item => {

            setAgencyRequest(item);

            console.log(item);
        })

    }, [agencyRequestId]);


    const handleEdit = (step, itemId) => {

        window.location.pathname = `/web/banking/e/agency-request-edition${step}/${displayPageTemplateId}/` + itemId

    }

    return (
        <>
            {agencyRequest
                && (
                    <DropDown trigger={
                        <Button className="btn btn-sm btn-primary">
                            <ClayIcon symbol="ellipsis-v"
                                      focusable="false"
                                      role="presentation"/>
                        </Button>
                    }>
                        <DropDown.ItemList>
                            {agencyRequest["status"].label === "draft" && (
                                <DropDown.Item onClick={() => handleEdit('', agencyRequestId)}>Edit</DropDown.Item>
                            )}
                            {agencyRequest["agencyRequestStatus"].key === "qualificationVerification"
                                && agencyRequest["status"].label === "approved"
                                && (
                                    <DropDown.Item onClick={() => handleEdit('-step3', agencyRequestId)}>Complete Step 3</DropDown.Item>
                                )}
                            {agencyRequest["agencyRequestStatus"].key === "preparationVerification"
                                && agencyRequest["status"].label === "approved"
                                && (
                                    <DropDown.Item onClick={() => handleEdit('-step4', agencyRequestId)}>Complete Step 4</DropDown.Item>
                                )}
                            <DropDown.Item onClick={() => window.location.pathname = `/web/banking/my-request`}>Back</DropDown.Item>
                        </DropDown.ItemList>
                    </DropDown>
                )
            }
        </>
    )
}

export default AgencyRequestNavigation;