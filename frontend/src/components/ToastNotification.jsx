import React, { useEffect, useState } from 'react';
import '../styles/ToastNotification.css';

const ToastNotification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose(); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return (
        <div className="toast-notification">
            <span>{message}</span>
        </div>
    );
};

export default ToastNotification;
