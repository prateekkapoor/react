import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        postSelectedId: null,
    }
    componentDidMount() {
        axios.get('/posts').then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return { ...post, author: 'Prateek' }
            })
            this.setState({ "posts": updatedPosts })
        }).catch((error => {
            console.log(error);
            //this.setState({ error: true })
        }));
    }
    postSelectedHandler = (id) => {
        this.setState({ postSelectedId: id })
    }

    render() {
        let posts = this.state.posts.map(post => {
            return (
                <Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
            )
        });
        return (
            <div className="Posts">
                <section className="Posts">
                    {posts}
                </section>
            </div>
        )
    }
}

export default Posts;