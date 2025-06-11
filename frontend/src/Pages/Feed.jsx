import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card'
import { showToast } from './../Components/ShowToast';
import axios from 'axios';
import { BASE_URL } from './../utils/constant';
import { addFeedItems } from '../Store/Slice/feedSLice';
const Feed = () => {
    const dispatch = useDispatch();

    const feed = useSelector((state) => state.feed.data)
    const loading = useSelector((state) => state.feed.loading)
    // const error = useSelector((state) => state.feed.error)


    useEffect(() => {
        async function fetchFeed() {
            try {
                const response = await axios.get(BASE_URL + "/api/v1/user/feed", {
                    withCredentials: true
                })
                dispatch(addFeedItems(response.data.feed));

            } catch (error) {
                showToast(error.response.data, "error");
            }
        }
        fetchFeed();
    }, []);


    return (
        <div>

            <div className='flex flex-wrap justify-center gap-4 p-4'>
                {
                    feed && feed.length > 0 ? (
                        feed.map((data, index) => (
                            <Card key={data?._id || index} data={data} loading={loading} />
                        ))
                    ) :
                        <h1 className='text-2xl text-center'>No Feed Available</h1>
                }


            </div>

        </div>
    )
}

export default Feed
