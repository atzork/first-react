import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({id: 1, title: '', body: ''})
    const addNewPost = () => {
        const title = '';
        const body= '';
        const newPost = { ...post, id: Date.now()}
        create(newPost);
        setPost({...post, title, body})
    }
    return (
        <form className='PostForm'>
            <MyInput type='text' name='title' placeholder='Post name'
                     value={post.title} onChange={(e) => setPost({...post, title: e.target.value})}/>
            <MyInput type='text' name='description' placeholder='Post description'
                     value={post.body} onChange={(e) => setPost({...post, body: e.target.value})}/>
            <MyButton type='button' onClick={addNewPost}>Create</MyButton>
        </form>
    );
};

export default PostForm;