import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Post from './post/Post';
import makeStyles from './style';

function Posts({ setcurrentId }) {
    const posts = useSelector(state => state.posts);
    const classes = makeStyles();
    console.log(posts);
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={ classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={ post._id } item xs={12} sm={6}>
                            <Post post={post} setcurrentId={setcurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;
