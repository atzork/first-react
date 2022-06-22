import {useMemo} from "react";

export const useSortedPost = (posts, sortKey) => {
    return useMemo(() => sortKey
        ? [...posts].sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        : [...posts], [sortKey, posts])
}

export const usePosts = (posts, sortKey, query) => {
    const sortedPosts = useSortedPost(posts, sortKey)
    return useMemo(() => sortedPosts.filter(post => post.body.includes(query)), [query, sortedPosts])
}