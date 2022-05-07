import React, {useState, useEffect} from "react";

export const observer = (Component) => {
    return (props) => {
        const {store} = props;
        const [count, setCount] = useState(0);
        const trigger = () => {
            setCount((new Date().getTime()));
        }

        if(store) {
            store.subscribe(trigger);
            useEffect(() => {return () => store.subscribe(trigger)});

            return (
                <Component store={store} {...props} />
            );
        }
    };
}