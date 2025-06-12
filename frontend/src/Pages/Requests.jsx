import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { addRequests, removeRequest } from '../Store/slice/requestSlice.js';
import { useEffect } from 'react';
import { showToast } from '../Components/ToastHelper.js';
import { useNavigate } from 'react-router';

const Requests = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requests = useSelector((state) => state?.requests?.data);
    console.log('requestSelector::', requests);


    async function reviewRequest(reqId, status) {
        try {
            const res = await axios.post(
                `${BASE_URL}/api/v1/request/respond/${status}/${reqId}`,
                {},
                { withCredentials: true }

            );
            console.log('reviewRequest:', res?.data?.message);
            showToast(res?.data?.message, "success")
            dispatch(removeRequest(reqId))
            getRequests();
            navigate("/friends")
        } catch (error) {
            console.log('reviewRequestError:', error);
            showToast(error.response?.data || "An error occurred", "error");
        }
    }



    async function getRequests() {
        try {
            const res = await axios.get(BASE_URL + '/api/v1/user/requests', {
                withCredentials: true,
            });
            console.log('requestData:', res?.data);
            dispatch(addRequests(res?.data?.pendingRequest));
        } catch (error) {
            console.log('requestError:', error);
        }
    }

    useEffect(() => {
        if (requests && requests.length > 0) return;
        getRequests();
    }, []);

    return (
        <div className=" overflow-x-hidden overflow-y-hidden">
            <h2 className="text-lg font-semibold text-gray-400 text-center mt-6">
                Invitations ({requests?.length || 0})
            </h2>

            <div className="flex justify-center mt-4">
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4">
                    {requests?.map((req) => {
                        const sender = req.senderId;
                        const sendDate = new Date(req.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        });

                        return (
                            <div
                                key={req._id}
                                className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg shadow-md list-row border-2 border-amber-300 mt-3 w-full mb-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={sender.photoUrl}
                                        alt={`${sender.firstName} ${sender.lastName}`}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {sender.firstName} {sender.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-300 capitalize my-1">
                                            {sender.gender}, Age: {sender.age || 'N/A'}
                                        </p>
                                        <p className="text-sm text-gray-300">
                                            Skills: {sender.skills?.slice(0, 2)?.join(', ') || 'N/A'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Sent: {sendDate}</p>
                                    </div>
                                </div>

                                <div className="flex space-x-4 mt-4 sm:mt-0 sm:flex-col sm:space-x-0 sm:space-y-2">
                                    <button className="btn text-sm text-white bg-red-500 py-1 px-4 rounded-full" onClick={() => reviewRequest(req?._id, "rejected")}>
                                        Ignore
                                    </button>
                                    <button className="btn text-sm text-white bg-teal-500 py-1 px-4 rounded-full" onClick={() => reviewRequest(req?._id, "accepted")}>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

};

export default Requests;
