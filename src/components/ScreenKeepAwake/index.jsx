import React, { useState, useEffect } from 'react';
import './style.css';

const ScreenKeepAwake = () => {
    // 默认开启
    const [isKeepAwake, setIsKeepAwake] = useState(true);
    const [wakeLock, setWakeLock] = useState(null);

    // 请求屏幕常亮
    const requestWakeLock = async () => {
        try {
            if ('wakeLock' in navigator) {
                // 使用 Screen Wake Lock API
                const lock = await navigator.wakeLock.request('screen');
                console.log('Screen Wake Lock is active');
                setWakeLock(lock);
                return true;
            } else {
                // 降级方案：使用 title 更新
                const interval = setInterval(() => {
                    document.title = new Date().toISOString();
                }, 1000);
                setWakeLock(interval);
                console.log('Using title update fallback');
                return true;
            }
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

    // 初始化时自动开启
    useEffect(() => {
        requestWakeLock();
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