import './Comment.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { getToken, getDecodedToken } from '../../utils/getToken';
import axios from 'axios'


const Comment = (props) => {

    const [editable, setEditable] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3003/api/articles/delete_comment/${props.id}`,
                {
                    headers: {
                        'x-access-token': getToken()
                    }
                });
            await props.fetchComments()
        } catch (error) {
            console.log(error.message);
        }
    }

    const editHandler = async () => {
        try {
            const content = document.getElementById('editted').value
            const commentId = props.id;
            await axios.put('http://localhost:3003/api/articles/edit_comment',
                {
                    content,
                    commentId
                },
                {
                    headers: {
                        'x-access-token': getToken()
                    }
                });
            setEditable(false);
            await props.fetchComments();
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <section className="comment">
            <div className="comment-author">{props.user}:</div>
            {editable ?
                <form onSubmit={editHandler}>
                    <textarea
                        id='editted'
                        cols="43"
                        rows="3"
                        name='content'
                        defaultValue={props.content}
                    >
                    </textarea>
                </form>
                :
                <div className="comment-content">{props.content}</div>
            }
            {getToken() && getDecodedToken().username === props.user &&
                <div className='comment-control'>
                    {editable ?
                        <>
                            <Button
                                variant="success"
                                size="sm"
                                onClick={editHandler}>
                                Save
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => setEditable(false)}>
                                Cancel
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                variant="info"
                                size="sm"
                                onClick={() => setEditable(true)}>
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={handleDelete}>
                                Delete
                            </Button>
                        </>
                    }
                </div>
            }
        </section>
    )
};

export default Comment;