import React, { useState, useCallback } from 'react';
import packageJson from '../../../../../package.json';
import ImageViewer from 'react-simple-image-viewer';

const Images = props => {

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback(index => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const images = props.images ? props.images.map(img => packageJson.backendUrl + '/media/' + img) : [];

    return(
        <div className="flex flex-wrap content-center">
            {images.map((image, key) =>
                <img
                    src={image}
                    key={key}
                    alt={'image-' + key}
                    onClick={() => openImageViewer(key)}
                    className="w-12/12 sm:w-5/12 md:w-3/12 xl:w-2/12"
                    style={{
                        height: 'auto',
                        margin: '5px',
                        display: 'block',
                        position: 'static'
                    }}
                />
            )}
            {isViewerOpen && (
                <ImageViewer
                    src={ images }
                    currentIndex={ currentImage }
                    onClose={ closeImageViewer }
                />
            )}
        </div>
    )
}

export default Images;