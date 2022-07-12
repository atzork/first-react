import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPost, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getPost(id);
        setPost(response.data);
    })
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostService.getComments(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPost(params.id)
        fetchComments(params.id)
    }, [])
    return (
        <div>
            <h2>{post.id}. {post.title}</h2>
            {
                isLoading
                    ? <Loader/>
                    : <div>{post.body}</div>
            }
            {
                isCommentsLoading
                    ? <Loader/>
                    :
                        comments.map(comment =>
                            <div
                                key={comment.id}
                                style={{display: "grid", gridTemplateColumns: '200px auto', gap: '15px', margin: "10px 0", padding: '5px', background: 'lightcyan'}}>
                                <div>
                                    <h4>{comment.email}</h4>
                                    <h5 style={{marginTop: '5px'}}>{comment.name}</h5>
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        )

            }
        </div>
    );
};

export default Post;