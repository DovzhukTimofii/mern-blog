import { Alert, Button, Textarea } from "flowbite-react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function CommentSection({postId}) {
    const {currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(comment.length > 200) {
            setCommentError('забагато символів!Кількість символів повинна бути не більше 200')
        }

        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
            });
            const data = await res.json();
            
            if(res.ok) {
                setComment("");
                setCommentError(null)
                return data;
            }
        } catch (error) {
            setCommentError(error.message)
        }
      
        
    }
    return (
        <div className="max-w-3xl mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Увійшов користувач:</p>
                    <img className="h-5 w-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'} className="text-xs text-cyan-600 hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ): (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    Ви маєте увійти в профіль що б написати коментар
                    <Link className="text-blue-500 hover:underline" to={'/sign-in'}>
                        Увійт
                    </Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Додати коментар..." rows="3" maxLength="200"/>
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-xs">Залишилися {200 - comment.length} символів </p>
                        <Button gradientDuoTone="greenToBlue" type="submit">
                            Відправити
                        </Button>
                    </div>
                    {commentError && (<Alert color="failure" className="mt-5">{commentError}</Alert>)}
                </form>
            )}
        </div>
    )
}


CommentSection.propTypes = {
    postId: PropTypes.string.isRequired,
};
  
CommentSection.defaultProps = {
    postId: "",
};