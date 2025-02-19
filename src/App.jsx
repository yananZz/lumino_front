import React from 'react';
import ScreenKeepAwake from './ScreenKeepAwake.jsx';
import DynamicBackground from './components/DynamicBackground';
import './styles/background.css';

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

