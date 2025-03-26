/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
/*global Liferay*/

const scopeId = `${Liferay.ThemeDisplay.getScopeGroupId()}`
const scopeIdEndPoint = `/scopes/${scopeId}`
const agencyRequestStatusPickListERC = 'M9A28_AGENCY_REQUEST_STATUS'


export const config = {

    agentOauthAppId: '',

    scopeIdEndPoint: scopeIdEndPoint,

    agencyRequestsEndPoint: '/o/c/agencyrequests',
    agencyRequestStatusPickListERC: agencyRequestStatusPickListERC,
    agencyRequestStatusPickListEndPoint: `/o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/${agencyRequestStatusPickListERC}/list-type-entries`,

    siteDocumentEndPoint: `/o/headless-delivery/v1.0/sites/${scopeId}/documents`
};
