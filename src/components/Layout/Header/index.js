import React, { useEffect } from 'react';
import { getUser } from '../../../api';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { Link } from 'react-router-dom';


const Header = props => {
    
    useEffect(() => {
        getUser(props.token)
        .then(user => {
            props.fetchUser(user.data.data)
        })
        .catch(console.log);
    }, []);

    return(
        <header className="text-white">
            <div style={{
                backgroundImage: 'url(/documents-base/bg.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto',
                height: '0',
                paddingBottom: '25%',
                marginTop: '-100px',
                filter: 'brightness(30%)'
            }}>
            </div>
            <div style={{
                position: 'relative',
                top: '-80px',
                left: '50px',
                zIndex: '1000000'
            }}>
                <h1 className="h1">Baza dokumentów</h1>
                {props.user &&
                    <div className="float-right" style={{ marginRight: '100px', marginTop: '-320px' }}>
                        <span className="h6">{props.user.first_name} {props.user.last_name}</span>
                        <Link to="/documents-base/" className="ml-3 option">
                            <i className="fa fa-home mr-2"></i>
                            Strona główna
                        </Link>
                        <Link to="/documents-base/add" className="ml-3 option">
                            <i className="fa fa-plus mr-2"></i>
                            Dodaj dokument
                        </Link>
                        <Link to="/documents-base/logout" className="ml-3 option">
                            <i className="fa fa-sign-out-alt mr-2"></i>
                            Wyloguj się
                        </Link>
                    </div>
                }
            </div>
        </header>
    )
}





const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user
});

const  mapDispatchToProps = dispatch => ({
    fetchUser: user => dispatch(authActions.fetchUser(user))
})

export const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)