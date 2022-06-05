import {useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisible, setModalVisible] = useState(false)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalVisible(false)
    }
    const removePost = (post) => setPosts(posts.filter(_post => _post.id !== post.id))

  return (
    <div className="App">
        <MyModal visible={modalVisible} setVisible={setModalVisible}>
            <PostForm create={createPost}/>
        </MyModal>
        <MyButton onClick={() => setModalVisible(true)}>Create post</MyButton>
        <PostFilter filter={filter} setFilter={setFilter} />
        <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts JS list'} />
    </div>
  );
}

export default App;
