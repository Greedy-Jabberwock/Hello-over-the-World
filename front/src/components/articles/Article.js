import '../common/Common.css';
import './Article.css';

import PAGES from '../../pages.const';
import BASE_URL from '../../utils/getBaseUrl';
import CommentForm from './CommentForm.js';


import { Offcanvas, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import axios from 'axios';

const Article = (props) => {
    const { id, title, content } = props.currentArticle;

    const [show, setShow] = useState(false);
    const [author, setAuthor] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchUsername = async (id) => {
        const response = await axios.get(`${BASE_URL}/api/users/user/${id}`);
        setAuthor(response.data.username);
    }

    useEffect(() => {
        if (!props.currentArticle.user) {
            fetchUsername(props.currentArticle.userId);
        } else {
            setAuthor(props.currentArticle.user.username)
        }
    }, [])

    return (
        <>
            <article className='content-container'>
                <button
                    className='back-button'
                    onClick={() => props.setPage(PAGES.articles)}
                >{'<'}</button>
                <h3 id='article-title'>{title}</h3>
                <p id='article-author'>Written by {author}</p>
                <hr />
                <p className='scroller'>{content}</p>

            </article>
            <div className='fixed-right'>
                {props.currentUser && props.currentUser.username === author &&
                    <Button
                        variant="warning"
                        onClick={() => {
                            props.setArticleEdit(true);
                            props.setPage(PAGES.new_article);
                        }}
                        className="me-2">
                        Edit
                    </Button>
                }
                <Button variant="primary" onClick={handleShow} className="me-2">
                    Comments
                </Button>

            </div>
            <Offcanvas
                placement='end'
                scroll='true'
                show={show}
                onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Comments</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CommentForm articleId={id} currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Article;