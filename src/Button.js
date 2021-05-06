import React from 'react';

function Button(props){
    return(
        <div>
            <button type="submit" onClick={props.onClick} data-testid={props.datatestid}
            style={{backgroundColor:"#10639C", width:"148px", height:"36px", border:"none"}}>
                <p style={{color:"white", fontSize:"18px", margin:"0"}}>{props.text}</p>
            </button>
        </div>
    );
}

export default Button;