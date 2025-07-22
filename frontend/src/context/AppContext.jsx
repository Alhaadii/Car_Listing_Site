import  { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signInStart = () => {
        setLoading(true);
    }
    const signInSuccess = (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null)
    }
    const signInFailure = (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
    }

    const value = {
        currentUser,
        error,
        loading,
        signInStart,
        signInSuccess,
        signInFailure
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}