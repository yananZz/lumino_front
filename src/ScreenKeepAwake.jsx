import React, { useState, useEffect } from 'react';

const ScreenKeepAwake = () => {
    const [isKeepAwake, setIsKeepAwake] = useState(false);

    useEffect(() => {
        if (isKeepAwake) {
            const interval = setInterval(() => {
                document.title = new Date().toISOString();
            }, 30000);

            return () => clearInterval(interval);
        } else {
            document.title = '屏幕常亮工具'; // 恢复原始标题
        }
    }, [isKeepAwake]);

    const toggleKeepAwake = () => {
        setIsKeepAwake(!isKeepAwake);
    };

    return (
        <div className="screen-keep-awake">
            <div className="toggle-container">
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={isKeepAwake}
                        onChange={toggleKeepAwake}
                    />
                    <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                    {isKeepAwake ? '关闭常亮' : '开启常亮'}
                </span>
            </div>
            <div className={`status-indicator ${isKeepAwake ? 'active' : ''}`}>
                <span className="dot"></span>
                <p className="status-text">
                    {isKeepAwake ? '屏幕常亮已开启' : '屏幕常亮已关闭'}
                </p>
            </div>
        </div>
    );
};

export default ScreenKeepAwake;