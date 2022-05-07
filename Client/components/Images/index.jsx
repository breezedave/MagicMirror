import React from "react";
import { observer } from "../../utils/observer"
import styles from "./Images.module.scss";

export const Images = observer(({store}) => {
    if(!store.images || !store.images.length) return <span />;
    const images = store.images.map((img) => <img src={img.src} />);

    return (
        <div className={styles.picHold}>{images[0]}</div>
    )
})