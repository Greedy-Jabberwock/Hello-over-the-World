import { Form, Button } from "react-bootstrap";
import Comment from "./Comment.js";

import { useState, useEffect } from 'react';
import axios from 'axios';

import { getToken } from "../../utils/getToken.js";

const CommentForm = (props) => {

    const [error, setError] = useState(null)
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const com_response = await axios.get(`http://localhost:3003/api/articles/article_comments/${props.articleId}`);
        setComments(com_response.data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = e.target.elements.content.value.trim();
        const token = getToken();
        if (!token) {
            setError('Not authorized');
            props.setCurrentUser(null);
            console.log('No token found');
            return null;
        }
        if (val) {
            if (val.length >= 4) {
                const data = {
                    content: val,
                    userId: props.currentUser.id,
                    articleId: props.articleId
                }
                await axios.put('http://localhost:3003/api/articles/add_comment', data, {
                    headers: {
                        'x-access-token': getToken()
                    }
                });
                await fetchComments();
                setError(null);
            } else {
                setError('Comment must be at least 4 symbols length.')
            }
        } else {
            setError("Comment can't be an empty string.");
        }
    }

    useEffect(() => {
        fetchComments();
    }, [error])

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Control as="textarea" name='content' placeholder="Enter your comment here..." minLength={4} />
                </Form.Group>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {props.currentUser ?
                    <>
                        <Button size="sm" variant="primary" type="submit">
                            Send
                        </Button>
                    </>
                    :
                    <Button size="sm" className="bg-danger disabled" variant="primary" type="submit">
                        You need to authorize to send messages.
                    </Button>
                }
            </Form>
            <hr />
            <>
                {comments.length > 0 &&
                    comments.map(comment => {
                        return <Comment
                            key={comment.id}
                            id={comment.id}
                            content={comment.content}
                            user={comment.user.username}
                            currentUser={props.currentUser}
                            fetchComments={fetchComments}
                        />
                    })}
            </>
        </>
    )
};

export default CommentForm;