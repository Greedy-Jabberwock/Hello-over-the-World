import '../common/Common.css';
import './Articles.css'

import PAGES from '../../pages.const';

import {
    ListGroup,
    Form,
    Table
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = (props) => {

    const [articles, setArticles] = useState(null);
    const [filteredArticles, setFilteredArticles] = useState(null);

    const fetchArticles = async () => {
        const articles_data = await axios.get('http://localhost:3003/api/articles');
        setArticles(articles_data.data);
        setFilteredArticles(articles_data.data);
    }

    const handleChange = (e) => {
        const filtered = articles.filter(article => article.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredArticles(filtered);
    }

    useEffect(() => {
        fetchArticles();
    }, [])

    return (
        <section className='content-container' id='articles-container'>
            <div list-of-articles>
                <ListGroup>
                    <ListGroup.Item id='search-field'>
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="Search article..."
                                onChange={handleChange}
                            />
                        </Form>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {filteredArticles && filteredArticles.length > 0 ?
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>About</th>
                                        <th>Written by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredArticles.map(article => {
                                        return (
                                            <tr key={article.id}>
                                                <td onClick={() => {
                                                    props.setCurrentArticle(article);
                                                    props.setPage(PAGES.article);
                                                }}>{article.title}</td>
                                                <td>{article.place.name}</td>
                                                <td>{article.user.username}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            :
                            <div>Sorry, but I can't find any articles about this place.</div>
                        }
                    </ListGroup.Item>

                    {
                        props.currentUser ?
                            <ListGroup.Item
                                key={'new'}
                                className='create-article-button'
                                style={{ backgroundColor: 'green', color: 'white' }}
                                onClick={() => {
                                    props.setCurrentArticle(null);
                                    props.setNeedHint(true);
                                    props.setPage(PAGES.map);
                                }}
                                onMouseOver={e => {
                                    e.target.style.backgroundColor = 'darkgreen';
                                }}
                                onMouseOut={e => {
                                    e.target.style.backgroundColor = 'green';
                                }}
                            >
                                Create new one
                            </ListGroup.Item>
                            :
                            <ListGroup.Item 
                                key={'error'}
                                className='create-article-button disabled'
                                style={{ backgroundColor: 'red', color: 'white' }}
                            >
                                You need to authorize to create new articles.
                            </ListGroup.Item>
                    }


                </ListGroup>
            </div>
        </section>
    )
}

export default Articles;

