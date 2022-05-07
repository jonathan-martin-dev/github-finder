import { React, createContext, useReducer } from 'react'
import GitHubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(GitHubReducer, initialState)

    const setLoading = () =>
        dispatch({
            type: 'SET_LOADING',
        })

    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const data = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    return (
        <GithubContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                users: state.users,
                loading: state.loading,
                fetchUsers,
            }}
        >
            {children}
        </GithubContext.Provider>
    )
}

export default GithubContext
