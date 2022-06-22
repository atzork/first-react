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
import {getPagesCount} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisible, setModalVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = parseInt(response.headers['x-total-count'], 10);
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const sortedAndSearchedPosts =  usePosts(posts, filter.sort, filter.query)

    useEffect(() => {
        fetchPosts()
    }, [page])

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
        <Pagination totalPages={totalPages} page={page} setPage={setPage}/>
    </div>
  );
}

export default App;
