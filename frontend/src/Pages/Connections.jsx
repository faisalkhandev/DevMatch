import { useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../components/ToastHelper.js';
import { BASE_URL } from '../utils/constant';
import axios from 'axios';
import { addConnections } from '../Store/slice/connectionSlice.js';
import Friends from '../components/Friends';

const Connections = () => {
    const dispatch = useDispatch();
    const connection = useSelector((state) => state.connections?.data);

    async function fetchConnections() {
        try {
            const response = await axios.get(BASE_URL + "/api/v1/user/connections", {
                withCredentials: true
            });
            dispatch(addConnections(response.data.friends));

        } catch (error) {
            showToast(error.response?.data || "An error occurred", "error");
        }
    }

    useEffect(() => {
        if (connection && connection.length > 0) return;
        fetchConnections();
    }, []);

    if (!connection) return <h1>Loading...</h1>;

    if (connection.length === 0) return <h1 className='flex justify-center items-center text-2xl mt-4 font-bold'>No Connections Found</h1>;

    return (
        <div>
            <div className='flex justify-center text-2xl mt-2'>

                <Friends />
            </div>
        </div>
    );
};

export default Connections;
