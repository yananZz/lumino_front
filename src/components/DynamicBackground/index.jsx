import React, { useState, useEffect } from 'react';
import './style.css';

const DynamicBackground = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [imageQuality, setImageQuality] = useState('high');

    // 检测网络状况
    const checkNetworkSpeed = () => {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === '4g') {
                return 'high';
            } else if (connection.effectiveType === '3g') {
                return 'medium';
            } else {
                return 'low';
            }
        }
        return 'high';
    };

    // 获取设备屏幕尺寸
    const getScreenDimensions = () => {
        const width = window.innerWidth || document.documentElement.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        return {
            width: Math.round(width * dpr),
            height: Math.round(height * dpr)
        };
    };

    const fetchNewBackground = async () => {
        try {
            const quality = checkNetworkSpeed();
            const screen = getScreenDimensions();
            
            // 根据网络和屏幕选择合适的图片尺寸
            let resolution;
            switch (quality) {
                case 'low':
                    resolution = '1280x720';
                    break;
                case 'medium':
                    resolution = '1920x1080';
                    break;
                case 'high':
                    resolution = '3840x2160';
                    break;
                default:
                    resolution = '1920x1080';
            }

            // 使用 Bing 壁纸 API
            const timestamp = new Date().getTime();
            const url = `https://bing.img.run/${resolution}.php?t=${timestamp}`;
            
            console.log(`Fetching Bing wallpaper with quality: ${quality}, resolution: ${resolution}`);
            
            const img = new Image();
            img.src = url;
            
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    console.log('Bing wallpaper loaded successfully');
                    resolve();
                };
                img.onerror = async (error) => {
                    console.error('Primary source failed, trying backup source');
                    // 备用 API
                    const backupUrl = `https://bing.biturl.top/?resolution=${resolution}&format=image&index=0&mkt=zh-CN`;
                    img.src = backupUrl;
                    try {
                        await new Promise((res, rej) => {
                            img.onload = res;
                            img.onerror = rej;
                        });
                        resolve();
                    } catch {
                        reject(error);
                    }
                };
            });

            setBackgroundUrl(img.src);
            setImageQuality(quality);
            console.log('Background updated successfully');
        } catch (error) {
            console.error('Failed to fetch Bing wallpaper:', error);
            // 使用静态备用图片
            setBackgroundUrl('https://bing.biturl.top/?resolution=1920x1080&format=image&index=0&mkt=zh-CN');
        }
    };

    // 监听网络变化
    useEffect(() => {
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', fetchNewBackground);
            return () => {
                navigator.connection.removeEventListener('change', fetchNewBackground);
            };
        }
    }, []);

    // 监听窗口大小变化（带防抖）
    useEffect(() => {
        const handleResize = () => {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(fetchNewBackground, 250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 初始加载和每日更新
    useEffect(() => {
        console.log('DynamicBackground component mounted');
        fetchNewBackground();
        
        const interval = setInterval(() => {
            console.log('Fetching new Bing wallpaper (24h interval)');
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