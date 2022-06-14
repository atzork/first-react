import {useEffect, useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisible, setModalVisible] = useState(false)
    const [isPostsLoading, setIsPostsLoading] = useState(false)

    const sortedAndSearchedPosts =  usePosts(posts, filter.sort, filter.query)

    useEffect(() => {
        fetchPhotos()
    },[])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalVisible(false)
    }

    async function fetchPhotos() {
        setIsPostsLoading(true)
        const posts = await PostService.getAll()
        setPosts(posts)
        setIsPostsLoading(false)
    }

    const removePost = (post) => setPosts(posts.filter(_post => _post.id !== post.id))

  return (
    <div className="App">
        <MyButton onClick={fetchPhotos}>Get posts</MyButton>
        <MyModal visible={modalVisible} setVisible={setModalVisible}>
            <PostForm create={createPost}/>
        </MyModal>
        <MyButton onClick={() => setModalVisible(true)}>Create post</MyButton>
         <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />
        {
            isPostsLoading
                ? <div
                    style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader />
                  </div>
                : <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts JS list'} />
        }
    </div>
  );
}

export default App;
