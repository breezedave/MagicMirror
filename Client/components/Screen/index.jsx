import React from "react";
import styles from "./Screen.module.scss";
import {observer} from "../../utils/observer";
import {Images} from "../Images";
import {Map} from "../Map";

export const Screen = observer(({store}) => {
    let Component = false;

    if(store.displayCurrent === "images") Component = Images;
    if(store.displayCurrent === "map") Component = Map;

    return (
        <div className={styles.screen}>
            {/*<Images store={store} />*/}
            {Component && <Component store={store} />}
        </div>
    );
});