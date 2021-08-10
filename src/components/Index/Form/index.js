import React from 'react';
import ImagesInput from '../../Admin/OneComplaint/ImagesInput';
import './style.css';

const Form = props => {
    return(
        <div>
            <form 
                onSubmit={props.onSubmit}
                className="mx-auto w-11/12 lg:w-8/12 p-5 mb-16"
                id='form'
            >
                <h1 className="text-3xl text-center mb-10 text-gray-400 font-bold">Złóż reklamację</h1>
                <div className='md:grid grid-cols-3 gap-4'>
                    <label className='col-span-2'>
                        <p className="font-bold text-gray-400">Tytuł</p>
                        <input 
                            type="text" 
                            name="title" 
                            className="appearance-none border border-gray-300 mt-2 w-full py-2 px-3 text-gray-700 mb-3"
                            onChange={props.onChange}
                            required
                        />
                    </label>
                    <br className="md:hidden"/>
                    <label>
                        <p className="font-bold text-gray-400">Numer faktury / paragonu</p>
                        <input 
                            type="text" 
                            name="document_number" 
                            className="appearance-none border border-gray-300 mt-2 w-full py-2 px-3 text-gray-700 mb-3"
                            onChange={props.onChange}
                            required
                        />
                    </label>
                </div>
                <label>
                    <p className="font-bold text-gray-400 mt-10">Opis</p>
                    <textarea
                        name="_description" 
                        className="appearance-none border border-gray-200 mt-2 rounded-xl w-full py-2 px-3 text-gray-700 mb-3 bg-gray-100"
                        style={{ height: '200px' }}
                        required
                    ></textarea>
                </label>
                <div className='md:grid grid-cols-3 gap-4 mt-10'>
                    <label>
                        <p className="font-bold text-gray-400">Email</p>
                        <input 
                            type='email' 
                            name='email' 
                            className='appearance-none border border-gray-300 mt-2 w-full py-2 px-3 text-gray-700 mb-3' 
                            onChange={props.onChange}
                            required
                        />
                    </label>
                    <div className='col-span-2'>
                        <p className="font-bold text-gray-400">Powód</p>
                        <ul className="donate-now">
                            {props.props.reasons.map((reason, key) => 
                                <li key={key}>
                                    <input 
                                        type='radio' 
                                        name='reason' 
                                        value={reason.pk}
                                        id={`reason_${reason.pk}`}
                                        onChange={props.onChange} 
                                        checked={props.props.formData.reason == reason.pk}
                                        required
                                    />
                                    <label htmlFor={`reason_${reason.pk}`}>{reason.name}</label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <br className="md:hidden"/>
                <label>
                    <p className="font-bold text-gray-400 mt-10">Zdjęcia</p>
                    <ImagesInput
                        max={10}
                        images={props.props.formData.images}
                        setImages={props.setImages}
                    />
                </label>
                <button
                    type="submit"
                    className="text-center text-white bg-green-600 p-3 mt-10 rounded"
                >
                    Wyślij
                </button>
            </form>
        </div>
    )
}

export default Form;