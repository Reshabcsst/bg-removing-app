"use client";
import React, { useEffect, useState } from 'react';
import ReactCompareImage from 'react-compare-image';
import Skeleton from './Skeleton';

export default function RemoveBackground() {
    const [image, setImage] = useState(null);
    const [bgRemove, setBgRemove] = useState(null);
    const [loading, setLoading] = useState(false);

    const FileChange = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        const removeBackground = async () => {
            if (image) {
                setLoading(true); // Start loading
                const apiKey = "d5qXSsHArjKrB3FnBJQSkuah";
                const apiUrl = "https://api.remove.bg/v1.0/removebg";

                const formData = new FormData();
                formData.append("image_file", image, image.name);
                formData.append("size", 'auto');

                try {
                    const res = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'X-Api-Key': apiKey,
                        },
                        body: formData,
                    });

                    const data = await res.blob();
                    const imageUrl = URL.createObjectURL(data);
                    setBgRemove(imageUrl);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        };

        removeBackground();
    }, [image]);

    return (
        <div className="container">
            <h1 className='h1'>Image Background Remover</h1>
            <div className="input_file">
                <label htmlFor="userImg" className="info_text">
                    Select a File
                </label>
                <input
                    type="file"
                    id="userImg"
                    className="form_control_file"
                    onChange={FileChange}
                    required
                />
            </div>
            <div className="preview_container">
                {loading && <Skeleton />}

                {!loading && image && bgRemove && (
                    <ReactCompareImage
                        leftImage={URL.createObjectURL(image)}
                        rightImage={bgRemove}
                        skeleton={<Skeleton />}
                    />
                )}
            </div>
            {bgRemove && !loading && (
                <div className="remove_bg_button">
                    <a href={bgRemove} download="background_removed_image.png">
                        <button className="download_btn">Download</button>
                    </a>
                </div>
            )}
        </div>
    );
}
