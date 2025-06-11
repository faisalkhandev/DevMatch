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
            if (feed && feed.length > 0) {
                return;
            }
            try {
                const response = await axios.get(BASE_URL + "/api/v1/user/feed", {
                    withCredentials: true
                })
                console.log("feed response::::", response);
                dispatch(addFeedItems(response.data.feed));

            } catch (error) {
                showToast(error.response.data, "error");
            }
        }
        fetchFeed();
    }, [feed, dispatch]);


    const firstFeedItem = feed && feed.length > 0 ? feed[0] : null;
    return (

        <>
            <div className='flex flex-wrap justify-center gap-5'>
                <Card data={firstFeedItem} loading={loading} />
            </div>
        </>
    );
};

export default Feed
