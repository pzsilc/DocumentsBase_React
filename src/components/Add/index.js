import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createDocument } from '../../api';
import { createNotification } from '../../functions';
import ImagesInput from './ImagesInput';
const ALLOW_EXTENSIONS = ['png', 'jpg', 'jpeg'];


const Add = props => {

    const [data, setData] = useState({
        name: "",
        files: [],
        category: null
    });

    const setFiles = files => {
        for(const file of files){
            let parts = file.name.split('.');
            if(!ALLOW_EXTENSIONS.includes(parts[parts.length - 1])){
                return createNotification('error', 'Nieprawidłowy format pliku ' + file.name)
            }
        }

        files.forEach(file => {
            file.base64 = URL.createObjectURL(file);
        })
        setData({
            ...data,
            files
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        if(!data.files.length){
            return createNotification('error', 'Musisz dodać jakiś skan')
        }

        createDocument(props.token, data.name, data.files, data.category)
        .then(res => {
            createNotification('success', 'Dodano dokument');
            setData({
                name: "",
                files: [],
                category: null
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('error', err.response)
        });
    }

    return(
        <div>
            <form
                onSubmit={onSubmit}
                className=""
            >
                <h1 className="h2 ml-5 pl-5 mb-5">Dodaj dokument</h1>
                <div className="d-flex justify-content-around">
                    <div/>
                    <div className="d-flex">
                        <label>
                            <b className="h5">Nazwa dokumentu</b>
                            <input
                                name="name"
                                className="float-right form-control"
                                placeholder="np. super tajny dokument"
                                type="text"
                                required
                                value={data.name}
                                onChange={e => setData({
                                    ...data,
                                    name: e.target.value
                                })}
                            />
                        </label>
                        <label className="ml-2">
                            <b className="h5">Kategoria</b>
                            <select 
                                name="category" 
                                className="form-control"
                                onChange={e => setData({
                                    ...data,
                                    category: e.target.value
                                })}
                                required
                            >
                                <option value="">...</option>
                                {props.user.categories.map((cat, key) => 
                                    <option 
                                        value={cat.id} 
                                        key={key}
                                        selected={cat.id == data.category}
                                    >{cat.name}</option>
                                )}
                            </select>
                        </label>
                    </div>
                    <div/>
                </div>
                <div className="my-5 mx-auto" style={{
                    width: '90%',
                    maxWidth: '500px'
                }}>
                    <ImagesInput
                        images={data.files}
                        max={20}
                        setImages={setFiles}
                    />
                </div>
                <br/>
                <div className="pb-5" style={{ marginBottom: '300px' }}>
                    <button
                        type="submit"
                        className="btn btn-primary float-right mr-5 mt-4"
                    >
                        <i className="fa fa-plus mr-2"></i>
                        Dodaj
                    </button>
                </div>
            </form>
        </div>
    )
}



const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token
})

export const AddContainer = connect(
    mapStateToProps, 
    null
)(Add)