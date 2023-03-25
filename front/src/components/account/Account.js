import '../common/Common.css';
import './Account.style.css';

import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';

import axios from 'axios';
import { getToken, getDecodedToken } from '../../utils/getToken';
import BASE_URL from '../../utils/getBaseUrl';

const Account = () => {

    const user = getDecodedToken();
    const [articles, setArticles] = useState([]);
    // const [quizzes, setQuizzes] = useState(null);

    const fetchArticles = async () => {
        const articles_response = await axios.get(`${BASE_URL}/api/articles/user_articles/${user.id}`,
        {headers: {
            'x-access-token': getToken()
        }})
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
                                    articles.length > 0 ? articles.map(article =>
                                        <tr key={article.id}>
                                            <td>{article.title}</td>
                                        </tr>
                                    )
                                    :
                                    <tr key="noart">
                                        <td>No articles yet</td>
                                    </tr>
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
                                <tr key="noqui">
                                    <td>No quizzes yet</td> 
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Account;