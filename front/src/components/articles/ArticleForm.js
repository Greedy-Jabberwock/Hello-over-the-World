import '../common/Common.css'

import { Form, Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import PAGES from '../../pages.const';

const ArticleForm = (props) => {
    
    console.log(props);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {title, content} = e.target.elements;

        const placeInfo = props.newMarkerInfo;
        const userId = jwt_decode(sessionStorage.getItem('AccessToken')).id;

        const place_response = await axios.post('http://localhost:3003/api/places/add_place', placeInfo);

        const placeId = place_response.data.id;

        const article_response = await axios.put('http://localhost:3003/api/articles/add_article', 
        {
            title,
            content,
            userId,
            placeId
        }
        );

        console.log(article_response.data);

        props.setPage(PAGES.articles);
    }

    return (
        <section className='content-container'>
            <button className='back-button'
                onClick={() => props.setPage(PAGES.map)}
            >{'<'}</button>
            <Form className='m-5' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" name='title' placeholder="Title of article" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Control as="textarea" name='content' rows={20} placeholder="Content of article"/>
                </Form.Group>

                { props.currentUser ? 
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