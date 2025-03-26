/*global Liferay*/
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {ClayIconSpriteContext} from '@clayui/icon';
import AgencyRequestNavigation from "./components/AgencyRequestNavigation";
import AgencyRequestCreationButton from "./components/AgencyRequestCreationButton";

const ELEMENT_ID = 'agent-enrollment-custom-element';
const ELEMENT_ID_AGENCY_REQUEST_NAVIGATION = 'agency-request-navigation';
const ELEMENT_ID_AGENCY_REQUEST_LIMITED_CREATION_BTN = 'request-creation-button';


class WebComponent extends HTMLElement {

    connectedCallback() {

        this.root = createRoot(this);

        this.root.render(
            <App
                route={this.getAttribute('route')}
                displayPageTemplateId={this.getAttribute('dpt')}/>,
            this
        );
    }

    disconnectedCallback() {

        this.root.unmount();

        delete this.root;

    }
}

class AgencyRequestNavigationWebComponent extends HTMLElement {

    connectedCallback() {

        this.root = createRoot(this);

        this.root.render(
            <ClayIconSpriteContext.Provider value={Liferay.Icons.spritemap}>
                <AgencyRequestNavigation
                    agencyRequestId={this.getAttribute('agency-request-id')}
                    displayPageTemplateId={this.getAttribute('dpt')}
                />
            </ClayIconSpriteContext.Provider>, this
        );
    }

    disconnectedCallback() {

        this.root.unmount();

        delete this.root;

    }
}

class CreateRequestButtonWebComponent extends HTMLElement {

    connectedCallback() {

        this.root = createRoot(this);

        this.root.render(
            <ClayIconSpriteContext.Provider value={Liferay.Icons.spritemap}>
                <AgencyRequestCreationButton
                    agencyRequestId={this.getAttribute('agency-request-id')}
                    limit={this.getAttribute('limit')}
                    displayPageTemplateId={this.getAttribute('dpt')}
                />
            </ClayIconSpriteContext.Provider>, this
        );
    }

    disconnectedCallback() {

        this.root.unmount();

        delete this.root;

    }
}

if (!customElements.get(ELEMENT_ID)) {
    customElements.define(ELEMENT_ID, WebComponent);
}

if (!customElements.get(ELEMENT_ID_AGENCY_REQUEST_NAVIGATION)) {
    customElements.define(ELEMENT_ID_AGENCY_REQUEST_NAVIGATION, AgencyRequestNavigationWebComponent);
}

if (!customElements.get(ELEMENT_ID_AGENCY_REQUEST_LIMITED_CREATION_BTN)) {
    customElements.define(ELEMENT_ID_AGENCY_REQUEST_LIMITED_CREATION_BTN, CreateRequestButtonWebComponent);
}