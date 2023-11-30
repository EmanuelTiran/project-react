import React, { useState, useEffect } from "react";

export default function Posts({ userId }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch(`http://localhost:3000/posts`);
            const data = await response.json();
            console.log("hi", data);
            setPosts(data);
        };

        (async () => await getPosts())();
    }, [userId]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const postsList = posts.map((post, index) => (
        <div key={post.id}>
            <p>
                <span>{index + 1}. </span>
                <span onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                    {post.title}
                </span>
            </p>
        </div>
    ));

    return (
        <div>
            <h1>User Posts</h1>
            {selectedPost ? (
                <div>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.body}</p>
                </div>
            ) : (
                <div>
                    <h2>Posts List</h2>
                    {postsList}
                </div>
            )}
        </div>
    );
}
