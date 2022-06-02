import PostItem from "./PostItem";

const PostsList = ({posts, title}) => {
    return (
        <div className='posts-list'>
            <h2 style={{textAlign: "center"}}>{title}</h2>
            {
                posts.map((post, index) => <PostItem number={index + 1} post={post} key={post.id} />)
            }
        </div>
    );
};

export default PostsList;