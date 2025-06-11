import { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../Components/ShowToast';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { addConnections } from '../Store/Slice/connectionSlice';
import Friends from '../Components/Friends';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector((state) => state.connections?.data);

    async function fetchConnections() {
        if (connection && connection.length > 0) return;
        try {
            const response = await axios.get(BASE_URL + "/api/v1/user/connections", {
                withCredentials: true
            });
            console.log("response:::", response.data.friends)
            dispatch(addConnections(response.data.friends));

        } catch (error) {
            showToast(error.response?.data || "An error occurred", "error");
        }
    }

    useEffect(() => {
        fetchConnections();
    });

    if (!connection) return <h1>Loading...</h1>;

    if (connection.length === 0) return <h1>No Connections Found</h1>;

    return (
        <div>
            <div className='flex justify-center text-2xl mt-2'>

                <Friends />
            </div>
        </div>
    );
};

export default Connections;
