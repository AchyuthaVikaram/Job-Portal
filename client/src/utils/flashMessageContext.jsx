// flashMessageContext.js
import React, { createContext, useState, useContext } from "react";

const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState({});

    const showMessage = (type, content) => {
        setMessage({ type, content });
        setTimeout(() => {
            setMessage({});
        }, 3000); // Message disappears after 3 seconds
    };

    return (
        <FlashMessageContext.Provider value={{ message, showMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};
