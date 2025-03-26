/*global Liferay*/
import React from "react";
import ClayManagementToolbar from '@clayui/management-toolbar';
import {ClayButtonWithIcon} from '@clayui/button';
import {ClayInput} from '@clayui/form';
import ClayDatePicker from '@clayui/date-picker';

const ManagementToolbar = ({
                               dateRange,
                               handleDateRangeChange,
                               searchKeyword,
                               handleSearchKeywordChange,
                               handleCloseSearchClick,
                               handleNewItem
                           }) => {

    return (
        <ClayManagementToolbar>
            <ClayManagementToolbar.ItemList expand={true}>
                <ClayManagementToolbar.Item>
                    {dateRange && (<ClayDatePicker
                        range
                        placeholder="YYYY-MM-DD"
                        years={{
                            end: 2024, start: 1997
                        }}
                        value={dateRange}
                        onChange={handleDateRangeChange}
                    />)}
                </ClayManagementToolbar.Item>

                <ClayManagementToolbar.Search>
                    <ClayInput.Group>
                        <ClayInput.GroupItem>
                            <ClayInput
                                aria-label="Search"
                                className="form-control input-group-inset input-group-inset-after"
                                value={searchKeyword}
                                onChange={handleSearchKeywordChange}
                                type="text"
                            />
                            <ClayInput.GroupInsetItem after tag="span">
                                <ClayButtonWithIcon
                                    aria-label="Close search"
                                    className={searchKeyword && (searchKeyword.length === 0) ? "navbar-breakpoint-d-none" : ""}
                                    displayType="unstyled"
                                    symbol="times"
                                    onClick={handleCloseSearchClick}
                                />
                                <ClayButtonWithIcon
                                    aria-label="Search"
                                    displayType="unstyled"
                                    symbol="search"
                                    type="submit"
                                />
                            </ClayInput.GroupInsetItem>
                        </ClayInput.GroupItem>
                    </ClayInput.Group>
                </ClayManagementToolbar.Search>

                <ClayManagementToolbar.Item>
                    <ClayButtonWithIcon
                        aria-label="Add"
                        title="Add Instruction"
                        className="nav-btn nav-btn-monospaced"
                        symbol="plus"
                        onClick={handleNewItem}
                        disabled={!Liferay.ThemeDisplay.isSignedIn()}
                    />
                </ClayManagementToolbar.Item>

            </ClayManagementToolbar.ItemList>
        </ClayManagementToolbar>
    )
}

export default ManagementToolbar;