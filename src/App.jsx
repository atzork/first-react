import {useEffect, useState} from "react";
import './styles/App.css'
import PostsList from "./components/PostsList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisible, setModalVisible] = useState(false)
    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const posts = await PostService.getAll()
        setPosts(posts)
    })

    const sortedAndSearchedPosts =  usePosts(posts, filter.sort, filter.query)

    useEffect(() => {
        fetchPosts()
    },[])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModalVisible(false)
    }

    const removePost = (post) => setPosts(posts.filter(_post => _post.id !== post.id))

  return (
    <div className="App">
        <MyButton onClick={fetchPosts}>Get posts</MyButton>
        <MyModal visible={modalVisible} setVisible={setModalVisible}>
            <PostForm create={createPost}/>
        </MyModal>
        <MyButton onClick={() => setModalVisible(true)}>Create post</MyButton>
         <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />
        {
            postsError && <h3>{postsError}</h3>
        }
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
