import React, { useState } from 'react';
import { connect } from 'react-redux';
import authActions from '../../../redux/auth/actions';
import { login } from '../../../api';
import { createNotification } from '../../../functions';


const Login = props => {

    const [data, setData] = useState({
        email: "",
        token: ""
    });
    
    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const onSubmit = e => {
        e.preventDefault();
        login(data.email, data.token)
        .then(res => {
            console.log(res)
            props.setToken(res.data.data.token);
            window.location.replace('/documents-base/');
        })
        .catch(err => {
            createNotification('error', err.response.data.data)
        });
    }
    
    return(
        <div className="mb-5 pb-5">
            <form
                onSubmit={onSubmit}
                className="mx-auto bg-white m-5 border p-5 d-flex justify-content-between"
                style={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: '800px',
                    top: '-150px'
                }}
            >
                <div>
                    <h1 className="h2 mb-5">Zaloguj się</h1>
                    <label>
                        <b>Email</b>
                        <br/>
                        <input 
                            type="email" 
                            name="email" 
                            onChange={onChange} 
                            value={data.email} 
                            className="form-control" 
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        <b>Hasło</b>
                        <br/>
                        <input 
                            type="password" 
                            name="token" 
                            onChange={onChange} 
                            value={data.password} 
                            className="form-control" 
                            required
                        />
                    </label>
                    <br/>
                    <button
                        type="submit"
                        className="btn btn-success mt-3"
                        style={{ width: '200px' }}
                    >
                        Zaloguj się
                    </button>
                    <div className="mt-5">
                        <a
                            href="http://192.168.0.234/token-reminder"
                            className="text-muted"
                            target="_blank"
                        >
                            Nie pamiętam tokenu
                        </a>
                    </div>
                </div>
                <div>
                    <i style={{ 
                        fontSize: '150px',
                        color: '#0d1d4a'
                    }} className="fa fa-copy"></i>
                </div>
            </form>
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(authActions.setToken(token))
})

export const LoginContainer = connect(
    null,
    mapDispatchToProps
)(Login)