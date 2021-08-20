import { useEffect } from 'react';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { logout } from '../../../api';
import { createNotification } from '../../../functions';


const Logout = props => {

    useEffect(() => {
        logout(props.token)
        .then(res => window.location.replace('/documents-base/login'))
        .catch(err => createNotification('error', 'Coś poszło nie tak.'));
    }, [])
    
    return null;
}


const mapStateToProps = state => ({
    token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
    remToken: () => dispatch(authActions.removeToken())
})

export const LogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout)