import React from 'react';

const Footer = () => {
    return(
        <footer
            className="text-white py-5 text-center"
            style={{ backgroundColor: '#0d1d4a' }}
        >
            <p className="h5">Documents database</p>
            <p>&copy; Silcare {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;