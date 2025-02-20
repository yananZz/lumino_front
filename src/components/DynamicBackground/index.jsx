import React, { useState, useEffect } from 'react';
import './style.css';

const DynamicBackground = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');

    const fetchNewBackground = async () => {
        try {
            // 直接使用 Bing 壁纸地址
            const timestamp = new Date().getTime();
            const resolution = '1920x1080';
            const urls = [
                `https://api.dujin.org/bing/1920.php?t=${timestamp}`,
                `https://bing.img.run/${resolution}.php?t=${timestamp}`,
                `https://bing.biturl.top/?resolution=${resolution}&format=image&index=0&mkt=zh-CN&t=${timestamp}`
            ];

            for (const url of urls) {
                try {
                    console.log('Trying to fetch wallpaper from:', url);
                    const img = new Image();
                    await new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                        img.src = url;
                    });
                    console.log('Successfully loaded wallpaper from:', url);
                    setBackgroundUrl(url);
                    return;
                } catch (error) {
                    console.warn('Failed to load image from:', url);
                    continue;
                }
            }

            // 如果所有 Bing 源都失败，使用随机图片
            const fallbackUrl = 'https://picsum.photos/1920/1080';
            console.log('Using fallback image source:', fallbackUrl);
            setBackgroundUrl(fallbackUrl);

        } catch (error) {
            console.error('Failed to fetch background:', error);
        }
    };

    useEffect(() => {
        console.log('DynamicBackground component mounted');
        fetchNewBackground();
        
        const interval = setInterval(() => {
            console.log('Fetching new background (24h interval)');
            fetchNewBackground();
        }, 24 * 60 * 60 * 1000);

        return () => {
            console.log('Cleaning up interval');
            clearInterval(interval);
        };
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