import '../common/Common.css';
import './Account.style.css';
import { Container, Row, Col, Table } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {

    const user = jwt_decode(sessionStorage.getItem('AccessToken'));
    const [articles, setArticles] = useState(null);
    // const [quizzes, setQuizzes] = useState(null);

    const fetchArticles = async () => {
        const articles_response = await axios.get(`http://localhost:3003/api/articles/user_articles/${user.id}`)
        setArticles(articles_response.data);
    }


    // QUIZZES FETCHING PLACEHOLDER

    useEffect(() => {
        fetchArticles();
    }, []);

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
                <hr />
                <Row>
                    <Col id='border-right'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>My articles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    articles && articles.map(article =>
                                        <tr key={article.id}>
                                            <td>{article.title}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>My quizzes: </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {
                                    articles && articles.map(article =>
                                        <tr key={article.id}>
                                            <td>{article.title}</td>
                                        </tr>
                                    )
                                } */}
                                <td>No quizzes yet</td>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Account;