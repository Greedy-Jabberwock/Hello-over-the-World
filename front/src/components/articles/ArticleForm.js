import '../common/Common.css'

import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import axios from 'axios';

import PAGES from '../../pages.const';
import { getToken, getDecodedToken } from '../../utils/getToken';

const ArticleForm = (props) => {

    const [fillTitle, setFillTitle] = useState('');
    const [fillContent, setFillContent] = useState('');

    const handleAddArticle = async (e) => {
        try {
            e.preventDefault();
            const { title, content } = e.target.elements;

            const placeInfo = props.newMarkerInfo;
            const userId = getDecodedToken().id;
            const place_response = await axios.post('http://localhost:3003/api/places/add_place', placeInfo,
                {
                    headers: {
                        'x-access-token': getToken()
                    }
                });
            const placeId = place_response.data.id;
            const data = {
                title: title.value,
                content: content.value,
                userId,
                placeId
            }
            await axios.put('http://localhost:3003/api/articles/add_article',
                data,
                {
                    headers: {
                        'x-access-token': getToken()
                    }
                }
            );

            props.setPage(PAGES.articles);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEditing = async (e) => {
        try {
            e.preventDefault();
            const title = e.target.elements.title.value;
            const content = e.target.elements.content.value;
            const articleId = props.currentArticle.id;
            const data = { title, content, articleId }
            await axios.put('http://localhost:3003/api/articles/edit_article', data,
                {
                    headers: {
                        'x-access-token': getToken()
                    }
                });
            setFillTitle('');
            setFillContent('');
            props.setArticleEdit(false);
            props.setCurrentArticle(props.currentArticle);
            props.setPage(PAGES.article);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (props.articleEdit) {
            setFillTitle(props.currentArticle.title);
            setFillContent(props.currentArticle.content);
        } else {
            setFillTitle('');
            setFillContent('');
        }
    }, [])

    return (
        <section className='content-container'>
            <button className='back-button'
                onClick={() => props.setPage(PAGES.map)}
            >{'<'}</button>
            <Form className='m-5' onSubmit={(e) => {
                if (props.articleEdit) {
                    handleEditing(e);
                } else {
                    handleAddArticle(e);
                }
            }}>
                <Form.Group className="mb-3" controlId="formArticleTitle">
                    <Form.Control
                        type="text"
                        name='title'
                        placeholder="Title of article"
                        defaultValue={fillTitle}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArticleContent">
                    <Form.Control
                        as="textarea"
                        name='content'
                        rows={20}
                        placeholder="Content of article"
                        defaultValue={fillContent}
                    />
                </Form.Group>

                {props.currentUser ?
                    props.articleEdit ?
                        <Button variant="primary" type="submit">
                            Edit
                        </Button>
                        :
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    :
                    <Button variant="danger" disabled type="submit">
                        You need authorized to add new article.
                    </Button>
                }
            </Form>
        </section>
    )
};

export default ArticleForm;
