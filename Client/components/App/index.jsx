import React from "react";
import { observer } from "../../utils/observer";

export const App = observer(({store}) => {
    const {messagesReceived} = store;

    return (
        <pre>
            {JSON.stringify(messagesReceived, null, 4)}
        </pre>
    )
})