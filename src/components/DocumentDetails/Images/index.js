import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

const Images = ({ images }) => {

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

    return(
        <div className="">
            {images.map((image, key) =>
                <img
                    src={image.file}
                    key={key}
                    alt={'image-' + key}
                    onClick={() => openImageViewer(key)}
                    width="200"
                    className="float-left"
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
                    src={ images.map(img => img.file) }
                    currentIndex={ currentImage }
                    onClose={ closeImageViewer }
                />
            )}
        </div>
    )
}

export default Images;