import React,{ useState, useEffect } from 'react';
import { AppBar,Typography,Grow,Grid, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

import Posts from '../Posts/Posts';
import Form from '../Form/form';



function Home() {
    const [currentId, setcurrentId] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId,dispatch])
    return (
        <Grid in="true">
            <Container>
                <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setcurrentId={setcurrentId}></Posts>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setcurrentId={setcurrentId}></Form>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    )
}

export default Home
