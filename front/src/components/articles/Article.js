import '../common/Common.css';
import './Article.css';

import PAGES from '../../pages.const';
import CommentForm from './CommentForm.js';

import { Offcanvas, Button } from 'react-bootstrap';
import { useState } from 'react';

const Article = (props) => {
    const { id, title, content } = props.currentArticle;
    const { username } = props.currentArticle.user;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <article className='content-container'>
                <button
                    className='back-button'
                    onClick={() => props.setPage(PAGES.articles)}
                >{'<'}</button>
                <h3 id='article-title'>{title}</h3>
                <p id='article-author'>Written by {username}</p>
                <hr/>
                <p className='scroller'>{content}</p>

            </article>
            <div className='fixed-right'>
                <Button variant="primary" onClick={handleShow} className="me-2">
                    Comments
                </Button>
                <Offcanvas
                    placement='end'
                    scroll='true'
                    show={show}
                    onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Comments</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <CommentForm articleId={id} currentUser={props.currentUser} setCurrentUser={props.setCurrentUser}/>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}

export default Article;