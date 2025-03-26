/* global Liferay */

import moment from "moment";

export function showError(title, message) {
    Liferay.Util.openToast({message, title, type: 'danger'});
}

export function showSuccess(
    title,
    message = 'The request has been successfully completed.'
) {
    Liferay.Util.openToast({message, title, type: 'success'});
}

export function getEmptyStateImage() {

    return `${Liferay.ThemeDisplay.getPathThemeImages()}/states/search_state.gif`;
}

export function getMonthStartEnd(){

    const startOfMonthLocal = moment().startOf('month');

    const startOfMonthUTC = startOfMonthLocal.utc().format('YYYY-MM-DD');

    const endOfMonthLocal = moment().endOf('month');

    const endOfMonthUTC = endOfMonthLocal.utc().format('YYYY-MM-DD');

    return {
        startDate:startOfMonthUTC,
        endDate: endOfMonthUTC
    }

}

function getValueByPath(obj, path) {
    // Split the path string by dot
    const keys = path.split('.');

    // Traverse the object using the keys
    return keys.reduce((acc, key) => {
        return acc ? acc[key] : undefined;
    }, obj);
}

export function groupData(keys,keyField,data){

    let groupedDataObject = [];

    keys.forEach(key => {
        groupedDataObject.push({
            key: key.value,
            title:key.title,
            data: data.filter(dataElement => getValueByPath(dataElement, keyField) === key.value)
        });
    });

    return groupedDataObject;

}
