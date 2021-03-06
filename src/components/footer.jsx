import React from 'react';

/* ---------- */
import './styles/footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faGithub } from '@fortawesome/free-brands-svg-icons';
/* ---------- */

function Footer() {
    return (
        <footer>
        Built with react
            <a href="https://reactjs.org">
                <FontAwesomeIcon icon={faReact} color="skyblue" /> 
            </a>
        open sourced on 
            <a href="https://github.com/gigamarr/adjaracant">
                <FontAwesomeIcon className="github" icon={faGithub} color="grey" />
            </a>
        </footer>
    )
}

/* ---------- */

export default Footer;