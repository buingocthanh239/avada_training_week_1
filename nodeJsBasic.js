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
        users = await fetchApi(BASE_URL + '/users');
        return users
    } catch (err) {
        console.log(err)
    }
}

// 3 
const fetchPosts = async () => {
    try {
        posts = await fetchApi(BASE_URL + '/posts');
        return posts
    } catch (err) {
        console.log(err)
    }
}

const fetchComments = async () => {
    try {
        comments = await fetchApi(BASE_URL + '/comments');
        return comments
    } catch (err) {
        console.log(err)
    }
}

const formatUsers = async () => {
    try {
        const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
        const newUser = users.map( user => {
            user.posts = posts.filter(post => post.userId === user.id);
            user.comments = comments.filter(comment => comment.email === user.email);
            return user;
        })
        return newUser; 
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
        const [users, posts, comments] = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()]);
        const newUser = users.map( user => {
            user.postCounts = posts.reduce((total, currPost) => {
                if (currPost.userId === user.id) return ++total;
                return total;
            }, 0);
            user.commentCounts = comments.reduce((total, comment) => {
                if (comment.email === user.email) return ++total;
                return total;
            }, 0);
            return user;
        })
        return newUser; 
    } catch (err) { 
        console.log(err)
    }
}

// 6
const findUserWithTheMostComments = async () => {
    const users = await reformatUser();
    const findUser = users.reduce((maxUser, currUser) => maxUser.commentCounts < currUser.commentCounts ? currUser : maxUser);
    return findUser;
}

const findUserWithTheMostPosts = async () => {
    const users = await reformatUser();
    const findUser = users.reduce((maxUser, currUser) => maxUser.postCounts < currUser.postCounts ? currUser : maxUser);
    return findUser;
}

// 7
const sortUser = async () => {
    const user = await reformatUser();
    return user.sort((currUser, nextUser) => nextUser.postCounts - currUser.postCounts) 
}
// 8
const mergePost = async () => {
    const post = await fetchApi(BASE_URL + '/posts/1');
    const comments = await fetchApi(`${BASE_URL}/comments?postId=${post.id}`)
    post.comments = comments;
    return post
}

mergePost() 
    .then(users => console.log(users))

