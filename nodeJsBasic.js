const BASE_URL = 'https://jsonplaceholder.typicode.com'

// 1 
const fetchApi =  async (api) => {
    try {
        const response = await fetch(api)
        return response.json();
    } catch (err) {
        console.log(err)
    }
}   

// 2
const fetchUsers = async () => {
    try {
        const users = await fetchApi(BASE_URL + '/users');
        return users
    } catch (err) {
        console.log(err)
    }
}

// 3 
const fetchPosts = async () => {
    try {
        const posts = await fetchApi(BASE_URL + '/posts');
        return posts
    } catch (err) {
        console.log(err)
    }
}

const fetchComments = async () => {
    try {
        const comments = await fetchApi(BASE_URL + '/comments');
        return comments
    } catch (err) {
        console.log(err)
    }
}

const fetchAllApi = async () => {
    const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
    return [users, posts, comments];
}

const formatUsers = async () => {
    try {
        const [users, posts, comments] = await fetchAllApi();
        return  users.map( user => ({
                ...user,
                posts: posts.filter(post => post.userId === user.id),
                comments: comments.filter(comment => comment.email === user.email)
            })
        )
    } catch (err) { 
        console.log(err)
    }

}

/// 4 
const filterUserHasMoreThreeComments = async () => {
    try {
        const users = await formatUsers();
        return users.filter(user => user.comments.length > 3);
    } catch (err) {
        console.log(err)
    }
}

// 5
const reformatUser = async () => {
    try {
        const users = await formatUsers();
        return users.map( user => {
            const { posts, comments, ...originalUser} = user;
            return {
                ...originalUser,
                postCounts: posts.length,
                commentCounts: comments.length
            }
        })
        
    } catch (err) { 
        console.log(err)
    }
}

// 6
const findUserWithTheMostComments = async () => {
    const users = await reformatUser();
    return users.reduce((maxUser, currUser) => maxUser.commentCounts < currUser.commentCounts ? currUser : maxUser);
}

const findUserWithTheMostPosts = async () => {
    const users = await reformatUser();
    return users.reduce((maxUser, currUser) => maxUser.postCounts < currUser.postCounts ? currUser : maxUser);
}

// 7
const sortUser = async () => {
    const user = await reformatUser();
    const cloneUser = user;
    return cloneUser.sort((currUser, nextUser) => nextUser.postCounts - currUser.postCounts) 
}
// 8
const mergePost = async () => {
    const post = await fetchApi(BASE_URL + '/posts/1');
    const comments = await fetchApi(`${BASE_URL}/comments?postId=${post.id}`)
    return {
        ...post,
        comments: comments
    }
}

reformatUser() 
    .then(users => console.log(users))

