import React, { useState, useEffect } from 'react';
import './style.css';

const ScreenKeepAwake = () => {
    const [isKeepAwake, setIsKeepAwake] = useState(false);

    useEffect(() => {
        if (isKeepAwake) {
            const interval = setInterval(() => {
                document.title = new Date().toISOString();
            }, 30000);
            return () => clearInterval(interval);
        } else {
            document.title = '屏幕常亮工具';
        }
    }, [isKeepAwake]);

    return (
        <div className="screen-keep-awake">
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={isKeepAwake}
                    onChange={() => setIsKeepAwake(!isKeepAwake)}
                />
                <span className="toggle-slider"></span>
            </label>
        </div>
    );
};

export default ScreenKeepAwake; 