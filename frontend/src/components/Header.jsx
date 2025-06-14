import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Store/slice/authSlice.js';
import { showToast } from './ToastHelper.js';
import Cookies from 'js-cookie';
import { clearFeed } from '../Store/slice/feedSLice.js';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constant.js';

const Header = () => {
    const user = useSelector((state) => state.user.data);
    const requests = useSelector((state) => state.requests?.data || []);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hasPendingRequests = requests.length > 0;

    async function handleLogout() {
        try {
            await axios.post(BASE_URL + '/api/v1/logout', {
                withCredentials: true,
            });
            Cookies.remove('token');
            dispatch(removeUser());
            dispatch(clearFeed());
            localStorage.removeItem('token');
            showToast('Logout Successfully!', 'success');
            navigate('/login');
        } catch (err) {
            if (err.response) {
                showToast(err.response.data, 'error');
            } else {
                showToast('Something went wrong.', 'error');
            }
        }
    }

    return (
        <div className="navbar bg-base-200 shadow-sm px-4 sm:px-8">
            <div className="flex-1">
                <Link to="/feed" className="btn btn-ghost text-xl text-white">
                    Dev Match
                </Link>
            </div>

            <div className="flex-none flex items-center gap-4">
                <Link to="/friends" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Friends">
                    <div className="indicator">
                        <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 482.9 482.9" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="6"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M239.7,260.2c0.5,0,1,0,1.6,0c0.2,0,0.4,0,0.6,0c0.3,0,0.7,0,1,0c29.3-0.5,53-10.8,70.5-30.5 c38.5-43.4,32.1-117.8,31.4-124.9c-2.5-53.3-27.7-78.8-48.5-90.7C280.8,5.2,262.7,0.4,242.5,0h-0.7c-0.1,0-0.3,0-0.4,0h-0.6 c-11.1,0-32.9,1.8-53.8,13.7c-21,11.9-46.6,37.4-49.1,91.1c-0.7,7.1-7.1,81.5,31.4,124.9C186.7,249.4,210.4,259.7,239.7,260.2z M164.6,107.3c0-0.3,0.1-0.6,0.1-0.8c3.3-71.7,54.2-79.4,76-79.4h0.4c0.2,0,0.5,0,0.8,0c27,0.6,72.9,11.6,76,79.4 c0,0.3,0,0.6,0.1,0.8c0.1,0.7,7.1,68.7-24.7,104.5c-12.6,14.2-29.4,21.2-51.5,21.4c-0.2,0-0.3,0-0.5,0l0,0c-0.2,0-0.3,0-0.5,0 c-22-0.2-38.9-7.2-51.4-21.4C157.7,176.2,164.5,107.9,164.6,107.3z"></path> <path d="M446.8,383.6c0-0.1,0-0.2,0-0.3c0-0.8-0.1-1.6-0.1-2.5c-0.6-19.8-1.9-66.1-45.3-80.9c-0.3-0.1-0.7-0.2-1-0.3 c-45.1-11.5-82.6-37.5-83-37.8c-6.1-4.3-14.5-2.8-18.8,3.3c-4.3,6.1-2.8,14.5,3.3,18.8c1.7,1.2,41.5,28.9,91.3,41.7 c23.3,8.3,25.9,33.2,26.6,56c0,0.9,0,1.7,0.1,2.5c0.1,9-0.5,22.9-2.1,30.9c-16.2,9.2-79.7,41-176.3,41 c-96.2,0-160.1-31.9-176.4-41.1c-1.6-8-2.3-21.9-2.1-30.9c0-0.8,0.1-1.6,0.1-2.5c0.7-22.8,3.3-47.7,26.6-56 c49.8-12.8,89.6-40.6,91.3-41.7c6.1-4.3,7.6-12.7,3.3-18.8c-4.3-6.1-12.7-7.6-18.8-3.3c-0.4,0.3-37.7,26.3-83,37.8 c-0.4,0.1-0.7,0.2-1,0.3c-43.4,14.9-44.7,61.2-45.3,80.9c0,0.9,0,1.7-0.1,2.5c0,0.1,0,0.2,0,0.3c-0.1,5.2-0.2,31.9,5.1,45.3 c1,2.6,2.8,4.8,5.2,6.3c3,2,74.9,47.8,195.2,47.8s192.2-45.9,195.2-47.8c2.3-1.5,4.2-3.7,5.2-6.3 C447,415.5,446.9,388.8,446.8,383.6z"></path> </g> </g> </g></svg>
                    </div>
                </Link>

                <Link to="/requests" className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Requests">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {hasPendingRequests && (
                            <span className="badge badge-accent badge-sm indicator-item">New</span>
                        )}
                    </div>
                </Link>

                {<>
                    <span>{user && (user?.firstName || "" + " " + user?.lastName || "").toUpperCase()}</span>
                </>
                }
                {/* User Dropdown */}
                {user?.photoUrl && (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar avatar-online">
                            <div className="w-10 rounded-full">
                                <img src={user.photoUrl} alt="User Avatar" />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >

                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/friends">Friends</Link>
                            </li>
                            <li>
                                <Link to="/requests">
                                    Requests{' '}
                                    {hasPendingRequests && (
                                        <span className="badge badge-accent badge-sm ml-1">new</span>
                                    )}
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
