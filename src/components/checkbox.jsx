import React from 'react';

/* ---------- */
import './styles/checkbox.scss';
/* ---------- */

function Checkbox(props) {
    return (
        <div className={`checkbox${props.checked ? ' checked' : ''}`} onClick={props.onClick}></div>
    )
}

/* ---------- */
export default Checkbox;