import { React, createContext, useReducer } from 'react'
import GitHubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState)

    const setLoading = () =>
        dispatch({
            type: 'SET_LOADING',
        })

    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text,
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const { items } = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items,
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS',
        })
    }

    return (
        <GithubContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                users: state.users,
                loading: state.loading,
                searchUsers,
                clearUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext
