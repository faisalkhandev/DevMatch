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

    useEffect(() => {
        async function fetchFeed() {
            if (feed && feed.length > 0) {
                return;
            }
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
    }, [feed, dispatch]);

    const firstFeedItem = feed && feed.length > 0 ? feed[0] : null;
    console.log("firstItem:::;", firstFeedItem)

    return (
        <>
            <div className="flex flex-wrap justify-center mt-4">
                {loading || !firstFeedItem ? (
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <Card data={firstFeedItem} loading={loading} />
                )}
            </div>
        </>
    );
};

export default Feed;
