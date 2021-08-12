import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { ComplaintsHandler, MessageHandler } from '../../../api';
import complaintViewActions from '../../../redux/complaintView/actions';
import loaderActions from '../../../redux/loader/actions';
import orderActions from '../../../redux/order/actions';
import Images from './Images';
import Order from './Order';
import Messages from './Messages';
import { Notifications } from '../../../functions';
import $ from 'jquery';


const AdminOneComplaint = props => {

    useEffect(() => props.setKey(props.match.params.key), []);

    useEffect(() => props.turnOffLoader(), [props.data])

    useEffect(() => {
        if(props._key){
            fetchComplaint();
        }
    }, [props._key])

    useEffect(() => {
        if(!$.isEmptyObject(props.data)){
            ComplaintsHandler.getOrderByComplaintKey(props.data.key)
            .then(res => {
                props.fetchOrder(res.data);
            })
            .catch(err => {
                console.log(err)
                Notifications.create('error', 'Nie udało się pobrać danych o zamówieniu powiązanym z reklamacją');
            })
        }
    }, [props.data]);

    const fetchComplaint = () => {  
        ComplaintsHandler.getOneComplaint(props._key)
        .then(res => {
            props.fetchData(res);
        })
        .catch(err => {
            console.log(err)
            Notifications.create('error', 'Nie udało się pobrać danych o reklamacji');
        })
    }

    const sendMessage = (e, images) => {
        e.preventDefault();
        let data = {
            content: e.target.content.value,
            owner_email: props.clientMode ? props.data.email : props.admin.email,
            complaint: props.data.id,
            images
        }
        MessageHandler.postMessage(data)
        .then(res => {
            Notifications.create('success', 'Wysłano wiadomość');
            fetchComplaint();
            document.querySelector('textarea[name="content"]').value = '';
        })
        .catch(err => {
            console.log(err);
            Notifications.create('error', 'Coś poszło nie tak');
        })
    }

    const execute = () => {
        ComplaintsHandler.patchComplaint(props.data.key, {
            status: props.data.status.pk + 1
        }, props.token)
        .then(res => {
            fetchComplaint();
            Notifications.create('success', 'Zaktualizowano reklamację');
        })
        .catch(err => {
            Notifications.create('error', 'Nie udało się zaktualizować reklamacji');
        })
    }

    const getExecuteTextByStatusId = id => {
        switch(id){
            case 1: return "Rozpocznij wykonywanie reklamacji";
            case 2: return "Zakończ reklamację";
            default: return "";
        }
    }

    if(props.loading){
        return(
            <div className="text-center">
                Loading...
            </div>
        )
    }

    return(
        <div style={{ overflow: 'hidden' }}>
            <div className="bg-green-400 text-white p-10 pt-32" style={{ marginTop: '-23px' }}>
                <b className="text-2xl">Reklamacja #{props.data.id}</b>
            </div>
            <div className="mt-10 md:border p-5 w-full md:w-8/12 mx-auto">
                <div className="w-4/12">
                    <table className="table-auto text-left">
                        <tbody>
                            <tr>
                                <th className="text-green-500">ID</th>
                                <td className="pl-2">{props.data.id}</td>
                            </tr>
                            <tr>
                                <th className="text-green-500">NR DOK.</th>
                                <td className="pl-2">{props.data.document_number}</td>
                            </tr>
                            <tr>
                                <th className="text-green-500">POWÓD</th>
                                <td className="pl-2">{props.data.reason ? props.data.reason.name : ""}</td>
                            </tr>
                            <tr>
                                <th className="text-green-500">STATUS</th>
                                <td className="pl-2">{props.data.status ? props.data.status.name : ""}</td>
                            </tr>
                            <tr>
                                <th className="text-green-500">DATA DODANIA</th>
                                <td className="pl-2">{props.data.created_at}</td>
                            </tr>
                            {!props.clientMode &&
                                <tr>
                                    <th className="text-green-500">EMAIL</th>
                                    <td className="pl-2">{props.data.email}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    {!props.clientMode &&
                        <React.Fragment>
                            {(props.data.status && props.data.status.pk != 3) && 
                                <div className="mt-10 w-screen">
                                    <button 
                                        className="bg-green-300 rounded-3xl p-2 px-10"
                                        onClick={execute}
                                    >
                                        <i className="fa fa-cog mr-3"></i>
                                        {getExecuteTextByStatusId(props.data.status.pk)}
                                    </button>
                                </div>
                            }
                        </React.Fragment>
                    }
                </div>
                <br/>
                <div className="mt-10">
                    <h3 className="text-2xl"><b>Tytuł:</b> {props.data.title}</h3>
                    <br/>
                    <b>Opis</b>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: props.data.description }}/>
                    <br/><br/>
                    <Images images={props.data.images}/>
                    <br/>
                    <Order order={props.order} />
                    <br/>
                    {!$.isEmptyObject(props.data) &&
                        <Messages 
                            messages={props.data.messages} 
                            sendMessage={sendMessage}
                            email={props.data.email}
                        />
                    }
                </div>
                <small className="text-gray-400">Klucz: {props.data.key}</small> 
            </div>          
        </div>
    )
}



const mapStateToProps = state => ({
    _key: state.complaintView.key,
    data: state.complaintView.data,
    loading: state.loader.loading,
    token: state.token.token,
    order: state.order.order,
    admin: state.login.admin
})

const mapDispatchToProps = dispatch => ({
    setKey: key => dispatch(complaintViewActions.setKey(key)),
    fetchData: data => dispatch(complaintViewActions.fetchData(data)),
    turnOffLoader: () => dispatch(loaderActions.turnOffLoader()),
    fetchOrder: order => dispatch(orderActions.fetchOrder(order))
})

export const AdminOneComplaintContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOneComplaint)