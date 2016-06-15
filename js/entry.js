/**
 * Created by Admin on 31.01.2016.
 */

import React from "react";
import ReactDom from "react-dom";
import Atlas from "./ReactComponents/Atlas.jsx"

ReactDom.render(<Atlas
    generalSetting={generalSettings}
    navigation={navigation}
    kmls={kmls}
    staticKmls={STATIC_KMLS}
/>, document.getElementById("cem"));