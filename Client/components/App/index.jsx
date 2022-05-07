import React from "react";
import { observer } from "../../utils/observer";
import styles from "./App.module.scss";
import "./global.scss";
import {Screen} from "../Screen";

export const App = observer(({store}) => {
    const duration = 30000;
    const lightCount = 150;

    const lights = []

    for(let i = 0; i < lightCount; i += 1) {
        lights.push(
        <div 
            key={`light_${i}`}
            className={`${styles.bgObj} bgObj`} 
            style={{animationDelay:`${duration / lightCount * i * -1}ms`}}
        >
        </div>)
    }


    return (
        <div className={styles.app}>
            {lights}
            
            <Screen store={store}/>
        </div>
    );
})