import {useEffect, useRef, useState} from "react";

import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPagesCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modalVisible, setModalVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postsError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = parseInt(response.headers['x-total-count'], 10);
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const sortedAndSearchedPosts =  usePosts(posts, filter.sort, filter.query)

    useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1))

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

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
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultOption='Items limit'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: 50, name: '50'},
                    {value: 100, name: '100'},
                    {value: -1, name: 'All'},
                ]}
            />
            {
                postsError && <h3>{postsError}</h3>
            }
            {
                isPostsLoading &&
                    <div
                        style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Loader />
                    </div>
            }
             <PostsList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts JS list'} />
             <div style={{height: 20, background: 'red'}} ref={lastElement}></div>
            <Pagination totalPages={totalPages} page={page} setPage={setPage}/>
        </div>
    );
}

export default Posts;
