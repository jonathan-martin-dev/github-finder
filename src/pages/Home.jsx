import React from 'react'

const Home = () => (
    <div>
        <h1 className="text-6xl">Welcome</h1>
        {process.env.REACT_APP_GITHUB_TOKEN}
    </div>
)

export default Home
