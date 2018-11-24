import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from '../../containers/Blog/Posts/Posts';
import NewPost from '../../containers/Blog/NewPost/NewPost';
import FullPost from '../../containers/Blog/FullPost/FullPost';
import './Blog.css';

class Blog extends Component {
    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: 'new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                                activeClassName="active"
                                style={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" exact component={NewPost} />
                    <Route path="/posts/:id" component={FullPost} />
                    <Redirect from ="/any" to="/new-post"></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Blog;