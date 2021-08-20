import React, { useState, useEffect } from 'react';
import { deleteDocument, getDocumentDetails } from '../../api';
import { createNotification } from '../../functions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Images from './Images';



const DocumentDetails = props => {

    const [document, setDocument] = useState(null);

    useEffect(() => {
        const id = props.match.params.id;
        getDocumentDetails(props.token, id)
        .then(res => {
            console.log(res);
            setDocument(res.data.data);
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Nie znaleiono dokumentu');
            props.history.push('/documents-base/');
        })
    }, [])

    const delDocument = () => {
        deleteDocument(props.token, document.id)
        .then(res => {
            createNotification('success', res.data.data)
            props.history.push('/documents-base/list/' + document.category.id);
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Coś poszło nie tak.');
        })
    }

    return(
        <div>
            {!document &&
                <div>
                    <p className="text-center text-muted mt-5 pt-5">Ładowanie...</p>
                </div>
            }
            {document &&
                <div className="mx-auto" style={{
                    width: '90%',
                    maxWidth: '1000px'
                }}>
                    <Link 
                        className="fa fa-arrow-left mb-5 h1 cursor-pointer text-decoration-none"
                        to={'/documents-base/list/' + document.category.id}
                    ></Link>
                    <h1 className="h1">{document.number}</h1>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <div className="text-muted">
                            <p>Dodano: {document.created_at}</p>
                        </div>
                        <div className="d-flex">
                            <button 
                                className="fa fa-times bg-danger p-2 m-1 text-white"
                                data-toggle="modal" 
                                data-target="#exampleModal"
                            ></button>
                        </div>
                    </div>
                    <div className="my-5 py-5">
                        <h3 className="h3">Zdjęcia ({document.images.length})</h3>
                        <div className="my-5 d-flex">
                            <Images
                                images={document.images}
                            />
                        </div>
                    </div>
                    <div className="my-5">
                        <p><b>ID:</b> {document.id}</p>
                        <p><b>Kategoria:</b> {document.category.name} ({document.category.slug})</p>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Usuwanie</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Czy na pewno chcesz usunąć ten dokument?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Anuluj</button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={delDocument}
                                >Usuń</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}




const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token
});

export const DocumentDetailsContainer = connect(
    mapStateToProps,
    null
)(DocumentDetails)