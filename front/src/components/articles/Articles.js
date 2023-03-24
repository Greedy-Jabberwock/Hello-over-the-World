import '../common/Common.css';
import './Articles.css'

import {
    Col,
    ListGroup,
    Row,
    Tab,
    Form
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {

    const [articles, setArticles] = useState(null);
    const [places, setPlaces] = useState(null);

    const fetchArticles = async () => {
        const articles_data = await axios.get('http://localhost:3003/api/articles');
        setArticles(articles_data.data);
    }

    const fetchPlaces = async () => {
        const places_names = await axios.get('http://localhost:3003/api/places/names');
        setPlaces(places_names.data);
    }

    useEffect(() => {
        fetchArticles();
        fetchPlaces();
    }, [])

    return (
        <section className='content-container' id='articles-container'>

            {articles ?
                <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4} style={{ borderRight: 1 + 'px' }}>
                            <ListGroup>
                                <ListGroup.Item id='search-field'>
                                    <Form>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Search place..." 
                                            onChange={(e) => console.log(e.target.value)}
                                        />
                                    </Form>
                                </ListGroup.Item>
                                <>
                                    {articles.map((article) => {
                                        const { id, title } = article;
                                        const { username } = article.user;
                                        // const { username } = article.user;
                                        return (
                                            <div key={id}>
                                                <ListGroup.Item action href={`#article${id}`}>
                                                    <div className='title'>
                                                        <span>{title}</span>
                                                        <span>Written by {username}</span>
                                                    </div>
                                                </ListGroup.Item>
                                            </div>)
                                    })}
                                </>
                                <ListGroup.Item
                                    key={'new'}
                                    action
                                    href="#create_new"
                                    className='create-article-button'
                                    onMouseOver={e => {
                                        e.target.style.backgroundColor = 'darkgreen';
                                    }}
                                    onMouseOut={e => {
                                        e.target.style.backgroundColor = 'green';
                                    }}
                                >
                                    Create new one
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content>
                                {articles.map(article => {
                                    const { id, content } = article;
                                    const _href = `#article${id}`
                                    return (
                                        <Tab.Pane eventKey={_href}>
                                            {content}
                                        </Tab.Pane>
                                    )
                                })}
                                <Tab.Pane eventKey="#create_new">
                                    Creating new article
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                :
                <div>There is no articles about this place yet! Be the first!</div>}

        </section>
    )
}

export default Articles;