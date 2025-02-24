import React, { useState, useEffect } from 'react';
import './style.css';

const ScreenKeepAwake = () => {
    // 默认开启
    const [isKeepAwake, setIsKeepAwake] = useState(true);
    const [wakeLock, setWakeLock] = useState(null);
    const [serviceWorker, setServiceWorker] = useState(null);

    // 注册 Service Worker
    const registerServiceWorker = async () => {
        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.register('/serviceWorker.js');
                setServiceWorker(registration);
                console.log('Service Worker registered');
                return registration;
            }
            return null;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            return null;
        }
    };

    // 请求屏幕常亮
    const requestWakeLock = async () => {
        try {
            // 首先尝试 Wake Lock API
            if ('wakeLock' in navigator) {
                const lock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock is active');
                setWakeLock(lock);
                return true;
            }
            
            // 如果没有 Wake Lock API，使用 Service Worker
            if (serviceWorker) {
                serviceWorker.active.postMessage('keepAwake');
                console.log('Using Service Worker for wake lock');
                return true;
            }

            // 最后使用 title 更新作为降级方案
            const interval = setInterval(() => {
                document.title = new Date().toISOString();
            }, 1000);
            setWakeLock(interval);
            console.log('Using title update fallback');
            return true;
        } catch (error) {
            console.error('Failed to request wake lock:', error);
            return false;
        }
    };

    // 释放屏幕常亮
    const releaseWakeLock = () => {
        if (wakeLock) {
            if (typeof wakeLock === 'number') {
                // 清除 title 更新的定时器
                clearInterval(wakeLock);
            } else {
                // 释放 Wake Lock
                wakeLock.release();
            }
            setWakeLock(null);
            document.title = '屏幕常亮工具';
            console.log('Screen Wake Lock released');
        }
    };

    // 处理开关变化
    const handleToggle = async () => {
        if (!isKeepAwake) {
            const success = await requestWakeLock();
            if (success) {
                setIsKeepAwake(true);
            }
        } else {
            releaseWakeLock();
            setIsKeepAwake(false);
        }
    };

    // 初始化
    useEffect(() => {
        const init = async () => {
            await registerServiceWorker();
            await requestWakeLock();
        };
        init();
    }, []);

    // 监听可见性变化
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (isKeepAwake && document.visibilityState === 'visible') {
                // 页面重新可见时，重新请求 wake lock
                await requestWakeLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            releaseWakeLock();
        };
    }, [isKeepAwake]);

    // 监听网络变化（某些移动设备在网络变化时可能会释放 wake lock）
    useEffect(() => {
        const handleNetworkChange = async () => {
            if (isKeepAwake) {
                await requestWakeLock();
            }
        };

        window.addEventListener('online', handleNetworkChange);
        return () => window.removeEventListener('online', handleNetworkChange);
    }, [isKeepAwake]);

    return (
        <div className="screen-keep-awake">
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={isKeepAwake}
                    onChange={handleToggle}
                />
                <span className="toggle-slider"></span>
            </label>
            <span className="status-text">
                {isKeepAwake ? '已开启' : '已关闭'}
            </span>
        </div>
    );
};

export default ScreenKeepAwake; 