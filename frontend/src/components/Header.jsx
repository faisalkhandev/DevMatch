import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeUser } from '../Store/slice/authSlice';
import { showToast } from './ShowToast';
import { BASE_URL } from '../utils/constant';
import Cookies from 'js-cookie';

const Header = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    async function handleLogout() {
        try {
            await axios.post(BASE_URL + "/api/v1/logout", {
                withCredentials: true,
            });
            Cookies.remove('token');
            dispatch(removeUser());
            showToast("Logout Successfully!.", 'success')
            navigate("/login");
        } catch (err) {
            if (err.response) {
                const data = err.response.data;
                showToast(data, 'error');
            } else {
                showToast("Something went wrong.", 'error');
            }
        }
    }

    // useEffect(() => {
    //     if (!user) {
    //         setDropdownOpen(false);
    //     }
    // }, [user]);

    return (
        <div className="navbar bg-base-200 shadow-sm flex justify-around items-center">
            <div className="flex">
                <a className="btn btn-ghost text-xl">Dev Match</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    {user?.photoUrl && (
                        <>
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img alt="User avatar" src={user.photoUrl} />
                                </div>
                            </div>
                            <span className="text-white">{user.firstName + " " + user.lastName}</span>
                        </>
                    )}

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a onClick={handleLogout}>Logout</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Header;
