import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Ayush",
    email: "ayush@example.com",
    password: "react",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const initalState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return initalState;
        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initalState
    );

    function login(email, password) {
        if (FAKE_USER.email === email && FAKE_USER.password === password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
