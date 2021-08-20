import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const Home = props => {
    return(
        <div className='border p-5 mx-auto mt-5' style={{
            width: '90%',
            maxWidth: '700px',
            marginBottom: '300px'
        }}>
            <div className='d-flex justify-content-between'>
                <div>
                    <i className="fa fa-user mr-2"></i>
                    {props.user.first_name} {props.user.last_name}
                </div>
                <p className='text-muted'>
                    {props.user.email}
                </p>
            </div>
            <br/>
            <Link
                to="/documents-base/add"
                className="text-muted cursor-pointer"
            >
                Dodaj dokument
            </Link>
            <ul className="list-group my-5 pb-5">
                {props.user.categories.map((cat, key) =>   
                    <Link 
                        to={'/documents-base/list/' + cat.id}
                        key={key}
                        className="text-decoration-none m-1"
                    >
                        <li className="list-group-item cursor-pointer">
                            {cat.name}
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    )
}



const mapStateToProsp = state => ({ user: state.auth.user })
export const HomeContainer = connect(mapStateToProsp, null)(Home)