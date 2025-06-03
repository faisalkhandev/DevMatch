import { Outlet, useNavigate } from 'react-router'
import { Footer, Header } from '../Components'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../Store/slice/authSlice';
import { showToast } from '../Components/ShowToast';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchUser() {
        try {

            const res = await axios.get(BASE_URL + '/api/v1/profile/view', {
                withCredentials: true
            })
            dispatch(addUser(res.data.user));
        } catch (error) {
            if (error.status === 401) {
                navigate('/login');
                return;
            }
            showToast('Something went wrong while fetching user data', 'error');
        }

    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />

        </div>
    )
}

export default Body
