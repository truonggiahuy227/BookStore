import React from 'react';
import './Popup.css'
import ReactLoading from 'react-loading';

const Loading = (props) => {
   
    return (props.trigger) ? (
        <div className="popup">
            <div className="popupInner">
                <ReactLoading className="loading" type={"spin"} color={"#0677d7"} height={200} width={200}/>
                <h5>Processing</h5>
            </div>
        </div>
    ) : ""
}


export default Loading;