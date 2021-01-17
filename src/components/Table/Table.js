import React, {  useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const CustomTable = () => {
    const [isLoaded, setLoaded] = useState(false);
    const [posts, setPostData] = useState([]);
    const [error, setError] = useState(false);

    let postHeaders = [];

    const setHeaders = () => {
       postHeaders =  Object.keys(posts[0]).slice(1, 4)
        console.log(posts);
    }

    const fetchData = async () => {
        try
        {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            console.log('Fetch complete!');
            setPostData(data);
            setLoaded(true);
        }
        catch
        {
            setError(true);
            alert('Fetch failed!');
        }
    }

    useEffect(() => {
        console.log('Fetching data...');
        fetchData();
    }, []);

    const renderTableHeader = () => {
        setHeaders();
        return (
            postHeaders.map((key, index) => {
                return <TableCell align="center" variant="head" key={index}>{key.toUpperCase()}</TableCell>
            })
        );
    }

    const renderTableData = () => {
        console.log(posts);
        if(posts.length > 0)
        {
            return ( 
                posts.map((post, index) => {
                    const { id, title, body } = post 
                    return (
                            <TableRow key={id}>
                                <TableCell> 
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<DeleteIcon />}
                                        onClick={() => { deleteRow(id) }}
                                        >
                                            {id} </Button>
                                     </TableCell>
                                <TableCell align='left'>{title}</TableCell>
                                <TableCell align='justify'>{body}</TableCell>
                            </TableRow>
                        )
                })
            );
        }
    }
    const deleteRow = (key) => {
        let tempPosts = [];
        tempPosts = posts.filter(e => e.id !== key);
        setPostData(tempPosts);
        console.log(key);
    }
    const classes = useStyles();

    if(error)
    {
        return <Typography variant="h1" color="red">Fetch Failed!</Typography> ;
    }
    else if(!isLoaded)
    {
        return (<CircularProgress color="secondary" /> );
    }   
    else
    {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Typography variant="h2">API Fetch Table</Typography>
                    <TableContainer>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {isLoaded ? renderTableHeader() : <TableCell></TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {isLoaded ? renderTableData() : <TableRow></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </React.Fragment>
        );
    }
}

export default CustomTable;
