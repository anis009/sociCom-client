import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContetxt/AuthProvider";
import Loader from "../../Shared/Loader/Loader";
import Post from "../Post/Post";

const Posts = () => {
	const [postLoading, setPostLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const [commentId, setCommentId] = useState();
	const { setTitle } = useContext(AuthContext);
	useEffect(() => {
		setTitle("Posts | SociCom");
	}, [setTitle]);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = () => {
		setPostLoading(true);
		fetch("https://socicom-server-anichu.vercel.app/posts")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setPosts(data);
				setPostLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setPostLoading(false);
			});
	};

	if (postLoading) {
		return (
			<div className="pt-[70px]">
				<Loader></Loader>
			</div>
		);
	}

	return (
		<div className="pt-[70px]">
			{posts &&
				posts?.map((post, index) => {
					return (
						<Post
							key={index}
							commentId={commentId}
							setCommentId={setCommentId}
							post={post}
							fetchPosts={fetchPosts}
						></Post>
					);
				})}
		</div>
	);
};

export default Posts;
