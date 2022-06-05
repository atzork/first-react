import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostsList = ({posts, title, remove}) => {

    if (!posts.length) {
        return <p style={{fontSize: '32px', fontWeight: "bold", margin: '10px', textAlign: "center"}}>Post list is empty</p>
    }

    return (
        <div className='posts-list'>
            <h2 style={{textAlign: "center"}}>{title}</h2>
            <TransitionGroup>
                {
                    posts.map((post, index) =>
                        <CSSTransition classNames='post' key={post.id}  timeout={500}>
                            <PostItem remove={remove} number={index + 1} post={post} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>
        </div>
    );
};

export default PostsList;