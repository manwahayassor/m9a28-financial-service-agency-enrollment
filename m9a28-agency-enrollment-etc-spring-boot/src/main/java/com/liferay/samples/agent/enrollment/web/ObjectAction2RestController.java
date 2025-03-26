/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.liferay.samples.agent.enrollment.web;

import com.liferay.samples.agent.enrollment.services.AgentRequestService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Raymond Augé
 * @author Gregory Amerson
 * @author Brian Wing Shun Chan
 */
@RequestMapping("/enrollment/step/2")
@RestController
public class ObjectAction2RestController extends BaseRestController {
    private final AgentRequestService _agentRequestService;

    public ObjectAction2RestController(AgentRequestService agentRequestService) {
        _agentRequestService = agentRequestService;
    }

    @PostMapping
    public ResponseEntity<String> post(
            @AuthenticationPrincipal Jwt jwt, @RequestBody String json) {

//        log(jwt, _log, json);

        JSONObject jsonObject = new JSONObject(json);

        JSONObject agencyRequestStatus = new JSONObject().put("key", "preparationVerification");

        JSONObject json1 = new JSONObject().put("agencyRequestStatus", agencyRequestStatus);
        json1.put("status", new JSONObject().put("code", 0).put("label", "approved"));

        System.out.println(json1.toString());

        ResponseEntity<String> response = _agentRequestService.update(jwt, jsonObject.getLong("classPK"), json1.toString());

        return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
    }

    private static final Log _log = LogFactory.getLog(
            ObjectAction2RestController.class);

}