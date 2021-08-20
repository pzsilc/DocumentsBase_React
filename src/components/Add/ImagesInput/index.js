import React, { Component } from 'react';

class ImagesInput extends Component {

    add = async(e) => {
        const getUrlFromFileObject = img => new Promise(resolve => {
            var reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.readAsDataURL(img);
        })
        let files = Array.from(e.target.files);
        if(files.length + this.props.images.length > this.props.max){
            return console.log('too many images');
        }
        for(const file of files){
            file.localUrl = await getUrlFromFileObject(file);
        }
        this.props.setImages([
            ...this.props.images,
            ...files
        ]);
        document.querySelector('input[type="file"]').value = null;
    }

    remove = index => this.props.setImages([
        ...this.props.images.slice(0, index),
        ...this.props.images.slice(index + 1)
    ])

    removeAll = () => this.props.setImages([]);
    

    render = () => {
        return(
            <React.Fragment>
                <div className="border p-5 text-center">
                    <label className="p-5 m-5 text-7xl text-blue-800">
                        <input 
                            id="files"
                            type="file"
                            accept="image/*"
                            onChange={this.add}
                            style={{ 'display': 'none' }}
                            multiple
                        />
                        <i className="fa fa-upload"></i>
                        <br/>
                        <small className="text-xs text-muted">Dozwolone formaty: .png, .jpg, .jpeg</small>
                    </label>
                    <br/><br/>
                    <small className="text-gray-400">{this.props.images.length} / {this.props.max}</small>
                    <br/><br/>
                    <div>
                    {this.props.images.map((img, key) => 
                        <div 
                            key={key}
                            className="inline-block text-left m-1 rounded border"
                        >
                            <div key={key} className="border rounded" style={{ 
                                backgroundImage: `url('${img.localUrl}')`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100% 100%',
                                filter: 'brightness(50%)',
                                width: `${this.props.width ? this.props.width : "150"}px`,
                            }}>
                                <button
                                    className="fa fa-times bg-danger p-1 text-white"
                                    type="button"
                                    onClick={() => this.remove(key)}
                                ></button>
                                <img 
                                    src={img.localUrl} 
                                    alt="Img" 
                                    style={{ visibility: 'hidden' }}
                                />
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                <button 
                    type="button" 
                    onClick={this.removeAll}
                    className="float-right text-gray-400 text-xs p-1"
                >
                    Usuń wszystkie
                </button>
            </React.Fragment>
        )
    }
}

export default ImagesInput;