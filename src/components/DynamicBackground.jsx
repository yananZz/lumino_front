import React, { useState, useEffect } from 'react';

const DynamicBackground = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    
    const fetchNewBackground = () => {
        // 直接使用从API响应中得知的URL格式
        const imageUrl = 'https://cn.bing.com/th?id=OHR.IceHoleOtter_ZH-CN0106321041_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
        setBackgroundUrl(imageUrl);
    };

    useEffect(() => {
        fetchNewBackground();
        // 每天更新一次壁纸
        const interval = setInterval(fetchNewBackground, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div 
            className="app-background" 
            style={{ 
                backgroundImage: backgroundUrl ? 
                    `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${backgroundUrl}")` :
                    'none',
                backgroundColor: 'black'
            }}
        />
    );
};

export default DynamicBackground; 