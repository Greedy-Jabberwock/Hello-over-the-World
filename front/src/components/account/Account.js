import '../common/Common.css';
import './Account.style.css';
import { Container, Row, Col } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {

    const user = jwt_decode(sessionStorage.getItem('AccessToken'));
    
    const [articles, setArticles] = useState(null);    
    // const [quizzes, setQuizzes] = useState(null);

    useEffect( () => {
        (async () => {
            const articles_response = await axios.get('http://localhost:3003/api/articles/user_articles', 
            {
                userId: user.id
            })
            setArticles(articles_response.data)
        })([]);
        // QUIZZES FETCHING PLACEHOLDER
    }, [user.id])

    return (
        <section className="content-container">
            <Container>
                <Row>
                    <Col>
                        <div>Username: {user.username}</div>
                        <div>Email: {user.email}</div>
                        <div>Created at: {user.createdAt}</div>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col id='border-right'>
                        <h3>My articles: </h3>
                        {articles && articles.map( article => <div key={article.id}>{article.title}</div> )}
                    </Col>
                    <Col>
                        <h3>My quizzes: </h3>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Account;