import { Outlet, useNavigate } from 'react-router'
import { Footer, Header } from '../Components'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Store/slice/authSlice';
import { showToast } from '../Components/ShowToast';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);

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
            showToast('Failed to fetch user data. Please try login again.', 'error');
        }

    }

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
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
