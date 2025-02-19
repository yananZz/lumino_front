import React, { useState, useEffect } from 'react';

const ScreenKeepAwake = () => {
    const [isKeepAwake, setIsKeepAwake] = useState(false);
    const [tasks, setTasks] = useState([]); // 假设这是任务信息的状态

    useEffect(() => {
        if (isKeepAwake) {
            const interval = setInterval(() => {
                document.title = new Date().toISOString();
            }, 30000); // Change the title every 30 seconds to keep the screen awake

            return () => clearInterval(interval);
        }
    }, [isKeepAwake]);

    const toggleKeepAwake = () => {
        setIsKeepAwake(!isKeepAwake);
    };

    return (
        <div className="screen-keep-awake" style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
            <button onClick={toggleKeepAwake} className="keep-awake-button" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                {isKeepAwake ? '关闭常亮' : '开启常亮'}
            </button>
            <p className="status" style={{ marginTop: '10px', fontSize: '14px' }}>
                {isKeepAwake ? '屏幕常亮已开启' : '屏幕常亮已关闭'}
            </p>
            {tasks.length === 0 && (
                <p style={{ marginTop: '10px', fontSize: '14px', color: 'red' }}>
                    无任务信息
                </p>
            )}
        </div>
    );
};

export default ScreenKeepAwake;