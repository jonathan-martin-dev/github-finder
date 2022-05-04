import React from 'react'
import spinner from './assets/spinner1.gif'

const Spinner = () => (
    <div className="w-100 mt-20">
        <img
            width={180}
            className="text-center mx-auto"
            src={spinner}
            alt="loading..."
        />
    </div>
)

export default Spinner
