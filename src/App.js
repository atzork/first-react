import { useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";


function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'Javascript-1', body: 'Description'},
      {id: 2, title: 'Javascript-2', body: 'Description'},
      {id: 3, title: 'Javascript-3', body: 'Description'},
  ])

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const addNewPost = () => {
        const id = Date.now();
        const newPost = {
            title, body, id
        }
        console.log(newPost)
        setPosts([...posts, newPost ])
        setTitle('')
        setBody('')
    }
  return (
    <div className="App">
        <form>
            <MyInput type='text' name='title' placeholder='Post name' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <MyInput type='text' name='description' placeholder='Post description' value={body} onChange={(e) => setBody(e.target.value)}/>
            <MyButton type='button' onClick={addNewPost}>Create</MyButton>
        </form>
        <PostsList posts={posts} title={'Posts JS list'} />
    </div>
  );
}

export default App;
