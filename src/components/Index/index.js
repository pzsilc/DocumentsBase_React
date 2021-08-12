import React, { useEffect } from 'react';
import addComplaintActions from '../../redux/addComplaint/actions';
import reasonsActions from '../../redux/reasons/actions';
import { connect } from 'react-redux'
import { ReasonsHandler, ComplaintsHandler } from '../../api';
import Form from './Form';
import Description from './Description';
import { Link } from "react-router-dom";
import { Notifications } from '../../functions';
import $ from 'jquery';


const Index = props => {

    useEffect(() => {
        ReasonsHandler.getReasons()
        .then(res => props.fetchReasons(res))
        .catch(err => Notifications.create('error', 'Nie udało się pobrać powodów'))
    }, [])

    useEffect(() => {
        if(props.admin){
            props.history.push('/admin');
        }
    }, [props.admin])

    const onChange = e => {
        const { name, value } = e.target;
        props.updateField(name, value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data = props.formData;
        let res = await ComplaintsHandler.checkIfExistsByDocumentNumber(data.document_number);
        console.log(res)
        if(!res.data.result){
            return Notifications.create('error', 'Podany nr dokumentu nie istnieje')
        }
        ComplaintsHandler.postComplaint(data)
        .then(res => {
            props.fetchResult(res);
            Notifications.create('success', 'Dodano reklamację');
        })
        .catch(err => {
            console.log(err)
            for(const [key, val] of Object.entries(err.data)){
                //create
            }
        })
    }

    if(!$.isEmptyObject(props.result)){
        return(
            <div className="text-center bg-green-400 pt-32 pb-36" style={{ marginTop: '-23px', marginBottom: '-140px' }}>
                <i className="fa fa-check text-green-600 text-9xl"></i>
                <p className="text-green-600 text-xl mt-10">Twoja reklamacja została zapisana</p>
                <div className="my-64">
                    Możesz śledzić reklamację pod linkiem
                    <br/>
                    <Link 
                        to={`/complaint/${props.result.key}`}
                        className="text-blue-800"
                    >{window.location.href}complaint/{props.result.key}</Link>.
                    <br/>
                    Ten link otrzymasz za chwilę również na adres email.
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <Description/>
                <Form
                    onSubmit={onSubmit}
                    onChange={onChange}
                    setImages={props.setImages}
                    props={props}
                />
            </div>
        )
    }
}




const mapStateToProps = state => ({
    reasons: state.reasons.reasons,
    formData: state.addComplaint.data,
    result: state.addComplaint.result,
    admin: state.login.admin
})

const mapDispatchToProps = dispatch => ({
    fetchReasons: reasons => dispatch(reasonsActions.fetchReasons(reasons)),
    updateField: (name, value) => dispatch(addComplaintActions.updateField(name, value)),
    setImages: images => dispatch(addComplaintActions.setImages(images)),
    fetchResult: data => dispatch(addComplaintActions.fetchResult(data)),
})

export const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
