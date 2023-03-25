import './Comment.css'
import { Button } from 'react-bootstrap';
import { getToken, getDecodedToken } from '../../utils/getToken';
import axios from 'axios'


const Comment = (props) => {

    const handleDelete = async () => {
        console.log(props);
        //http://localhost:3003/api/articles/delete_comment/3
        try {
            await axios.delete(`http://localhost:3003/api/articles/delete_comment/${props.id}`, 
            {headers: {
                'x-access-token': getToken()
            }});
            await props.fetchComments()
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <section className="comment">
            <div className="comment-author">{props.user}:</div>
            <div className="comment-content">{props.content}</div>
            {getToken() && getDecodedToken().username === props.user &&
                <div className='comment-control'>
                    <Button
                        variant="info"
                        size="sm"
                        onClick={() => console.log("Change")}>
                        Change
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            }
        </section>
    )
};

export default Comment;