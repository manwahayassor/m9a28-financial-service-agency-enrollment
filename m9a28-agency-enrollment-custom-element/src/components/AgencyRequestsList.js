/*global Liferay*/
import React, {useCallback, useEffect, useState} from "react";
import {getAgencyRequests, getAgencyRequestStatus} from "../services/AgencyRequestServices";
import moment from "moment";
import {Body, Cell, Head, Row, Table} from '@clayui/core';
import {ClayPaginationBarWithBasicItems} from '@clayui/pagination-bar';
import {Text} from '@clayui/core';
import {statusBadge} from "../services/myUtils";
import {showError} from "../utils/util";
import ManagementToolbar from "./ManagementToolbar";


const AgencyRequestsList = ({displayPageTemplateId}) => {

    const [delta, setDelta] = useState(20);

    const [sort, setSort] = useState(null);

    const [dateRange, setDateRange] = useState(null)

    const [searchKeyword, setSearchKeyword] = useState("")

    const [agencyRequests, setAgencyRequests] = useState([])

    const [agencyRequestStatues, setAgencyRequestStatues] = useState([])

    const [startDate, setStartDate] = useState(null);

    const [endDate, setEndDate] = useState(null);

    const loadAgencyRequests = useCallback(() => {

        getAgencyRequests().then((result) => {
            console.log(result.items)
            setAgencyRequests(result.items.map(value => ({
                ...value
            })));

        }, error => {
            showError("Error", error.message);
            // setIsLoading(false);
        }).catch(error => {
            showError("Error", error.message);
            // setIsLoading(false);
        })
    }, [])

    useEffect(() => {

        loadAgencyRequests();

    }, [startDate, endDate, searchKeyword])


    const onSortChange = useCallback(sort => {
        if (sort) {
            setAgencyRequests(items => items.sort((a, b) => {
                let cmp = new Intl.Collator("en", {numeric: true}).compare(a[sort.column], b[sort.column]);

                if (sort.direction === "descending") {
                    cmp *= -1;
                }

                return cmp;
            }));
        }

        setSort(sort);
    }, []);

    const handleNewMeeting = () => {

    }

    const handleDateRangeChange = (dateRange) => {

        const [startDate, endDate] = dateRange.split(" - ");

        let startDateObj = moment(startDate, "YYYY-MM-DD", true);

        let endDateObj = moment(endDate, "YYYY-MM-DD", true);

        if (startDateObj.isValid() && endDateObj.isValid()) {

            setStartDate(startDate);

            setEndDate(endDate);

            setDateRange(`${startDate} - ${endDate}`);

        }
    }

    const handleSearchKeywordChange = (newValue) => {

        setSearchKeyword(newValue.target.value)

    }

    useEffect(() => {
        getAgencyRequestStatus().then(result => {
            setAgencyRequestStatues(result.items);
        })
    }, [])


    const handleViewDetails = (itemId) => {

        window.location.pathname = `/web/banking/e/agency-request-details/${displayPageTemplateId}/` + itemId

    }

    return (<div style={{position: "relative", overflow: "hidden"}}>

        <ManagementToolbar handleCloseSearchClick={() => setSearchKeyword("")}
                           searchKeyword={searchKeyword}
                           handleSearchKeywordChange={handleSearchKeywordChange}
                           handleDateRangeChange={handleDateRangeChange}
                           dateRange={dateRange} handleNewItem={handleNewMeeting}/>

        {agencyRequests && agencyRequests.length ? (
                <>
                    <Table size={'sm'} onSortChange={onSortChange} sort={sort}>
                        <Head items={[{
                            id: "id", name: "ID", sortable: 1
                        }, {
                            id: "dateCreated", name: "Date", sortable: 1
                        }, {
                            id: "author", name: "Author"
                        }, {
                            id: "status", name: "Status"
                        }, {
                            id: "agencyRequestStatus", name: "Req. Status"
                        }, {
                            id: "cin", name: "CIN", sortable: 1
                        }, {
                            id: "tel", name: "Tel", sortable: 1
                        }, {
                            id: "mail", name: "Mail", sortable: 1
                        }, /*{
                            id: "address", name: "Address", sortable: 1
                        }, {
                            id: "lat", name: "Lat", sortable: 1
                        }, {
                            id: "long", name: "Long", sortable: 1
                        }, {
                            id: "message", name: "Message", sortable: 1, width: "20%"
                        }*/]}
                        >
                            {column => (<Cell key={column.id} sortable={column.sortable && "sortable"}
                                              width={column.width ? column.width : "100px"}>
                                {column.name}
                            </Cell>)}
                        </Head>
                        <Body items={agencyRequests}>
                            {row => (
                                <Row>
                                    <Cell key="id" sortable>
                                        <div className="btn btn-link">
                                            <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            <span onClick={() => handleViewDetails(row["id"])}>
                                                {row["id"]}
                                            </span>
                                            </Text>
                                        </div>
                                    </Cell>
                                    <Cell key="dateCreated" sortable>
                                        <Text size={2}>
                                            {row["dateCreated"] && moment(row["dateCreated"], "YYYY-MM-DD hh:mm").format("DD-MM-YYYY HH:mm")}
                                        </Text>
                                    </Cell>
                                    <Cell key="creator" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["creator"] && row["creator"].name}
                                        </Text>
                                    </Cell>
                                    <Cell key="status" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            <div
                                                className={"badge badge-" + (statusBadge[row["status"].label] || "secondary")}>
                                                {row["status"].label}
                                            </div>
                                        </Text>
                                    </Cell>
                                    <Cell key="agencyRequestStatus" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["agencyRequestStatus"] && row["agencyRequestStatus"].name}
                                        </Text>
                                    </Cell>
                                    <Cell key="cin" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["cin"] && row["cin"]}
                                        </Text>
                                    </Cell>
                                    <Cell key="tel" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["tel"] && row["tel"]}
                                        </Text>
                                    </Cell>
                                    <Cell key="mail" sortable>
                                        <Text className="text-left text-truncate-inline" size={2}>
                                            <span className="text-truncate">
                                               {row["mail"] && row["mail"]}
                                            </span>
                                        </Text>

                                    </Cell>
                                   {/* <Cell key="address" sortable>
                                        <Text className="text-left text-truncate-inline" size={2}>
                                            <span className="text-truncate">
                                               {row["address"] && row["address"]}
                                            </span>
                                        </Text>
                                    </Cell>
                                    <Cell key="lat" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["lat"] && row["lat"]}
                                        </Text>
                                    </Cell>
                                    <Cell key="long" sortable>
                                        <Text className="text-left text-truncate-inline" size={2} weight={'bold'}>
                                            {row["long"] && row["long"]}
                                        </Text>
                                    </Cell>
                                    <Cell key="message" sortable>
                                        <Text className="text-left text-truncate-inline" size={2}>
                                            <span className="text-truncate">
                                               {row["message"] && row["message"].replace(/(<([^>]+)>)/gi, "")}
                                            </span>
                                        </Text>
                                    </Cell>
                                   */}
                                    <Cell>
                                        <div></div>
                                    </Cell>

                                </Row>)}
                        </Body>
                    </Table>

                    {/*             <ClayPaginationBarWithBasicItems
                        activeDelta={delta}
                        defaultActive={1}
                        ellipsisBuffer={3}
                        ellipsisProps={{"aria-label": "More", title: "More"}}
                        onDeltaChange={setDelta}
                        showDeltasDropDown={false}
                        totalItems={21}
                    />*/}
                </>
            ) :
            <h1 className="d-flex justify-content-center display-5">Nothing found !</h1>
            /*is empty  :: you are up-to-date keep it up!*/
        }

    </div>)
}
export default AgencyRequestsList