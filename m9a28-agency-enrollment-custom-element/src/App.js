/*global Liferay*/
import './App.css';
import AgencyRequestsList from "./components/AgencyRequestsList";
import {ClayIconSpriteContext} from '@clayui/icon';

function App({route = "", displayPageTemplateId = 0}) {

    switch (route) {
        case "tasks":
            console.log(route)
            return (
                <>

                </>
            );
        case "dashboard":
            return (
                <>

                </>
            );
    }

    return (
        <>
            <ClayIconSpriteContext.Provider value={Liferay.Icons.spritemap}>
                <AgencyRequestsList displayPageTemplateId={displayPageTemplateId}/>
            </ClayIconSpriteContext.Provider>
        </>
    );
}

export default App;
