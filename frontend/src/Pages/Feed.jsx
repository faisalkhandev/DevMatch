import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {

    const user = useSelector((state) => state.user.data)

    return (
        <div>

            <h1>You have logged in as {user?.firstName + " " + user?.lastName}</h1>

        </div>
    )
}

export default Feed
