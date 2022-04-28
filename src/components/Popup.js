import React from 'react';
import './Popup.css'
import { useHistory } from "react-router-dom";

const Popup = (props) => {
    const history = useHistory();
   
    return (props.trigger) ? (
        <div className="popup">
            <div className="popupInner">
                {props.children}
                <button className="okBtn" onClick={() => {
                    props.setTrigger(false);
                    history.push("/cart");
                }}>OK</button>
            </div>
        </div>
    ) : ""
}


export default Popup;