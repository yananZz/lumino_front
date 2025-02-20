import React, { useState, useEffect } from 'react';

const DynamicBackground = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');

    const fetchNewBackground = async () => {
        try {
            const newUrl = 'https://bing.img.run/1920x1080.php';
            const img = new Image();
            img.src = newUrl;
            await new Promise(resolve => img.onload = resolve);
            setBackgroundUrl(newUrl);
        } catch (error) {
            console.error('Failed to fetch Bing wallpaper:', error);
        }
    };

    useEffect(() => {
        fetchNewBackground();
        const interval = setInterval(fetchNewBackground, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="background-container">
            <div 
                className="app-background" 
                style={{ 
                    backgroundImage: backgroundUrl ? 
                        `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${backgroundUrl}")` :
                        'none'
                }}
            />
        </div>
    );
};

export default DynamicBackground; 