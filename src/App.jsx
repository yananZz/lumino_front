import React from 'react';
import ScreenKeepAwake from './components/ScreenKeepAwake/index';
import DynamicBackground from './components/DynamicBackground/index';
import './styles/index.css';

function App() {
    return (
        <>
            <DynamicBackground />
            <div className="app-container">
                <div className="App">
                    <h1>屏幕常亮工具</h1>
                    <ScreenKeepAwake />
                </div>
            </div>
        </>
    );
}

export default App;

