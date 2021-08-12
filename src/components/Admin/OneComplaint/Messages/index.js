import React, { useState } from 'react';
import Images from '../Images';
import ImagesInput from '../ImagesInput';

const Messages = props => {

    const [images, setImages] = useState([]);

    return(
        <div className="my-10">
            <b className="text-xl">Wiadomości</b>
            {props.messages.map((message, key) => 
                <div 
                    key={key}
                    className={`border p-4 m-2 w-10/12 ${props.email === message.sender_email ? '': 'ml-auto'}`}
                >
                    <div className="flex justify-between">
                        <p>{message.sender_email}</p>
                        <p className="text-gray-400">{message.created_at}</p>
                    </div>
                    <br/>
                    {message.content}
                    <br/>
                    {message.images.length !== 0 &&
                        <Images 
                            images={message.images} 
                            maxWidth={100}
                        />
                    }
                </div>
            )}
            {!props.messages.length &&
                <p className="text-gray-300">Brak wiadomości</p>
            }
            <form 
                onSubmit={e => {
                    props.sendMessage(e, images);
                    setImages([]);
                }}
                className="my-10"
            >
                <b>Nowa wiadomość</b>
                <br/>
                <textarea 
                    className="border w-full p-2 rounded" 
                    placeholder="Wiadomość"
                    name="content"
                ></textarea>
                <br/>
                <ImagesInput
                    max={3}
                    images={images}
                    setImages={setImages}
                />
                <br/>
                <input 
                    type="submit"
                    className="bg-green-400 rounded p-2 cursor-pointer"
                />
            </form>
        </div>
    )
}

export default Messages;