import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comment from "../partials/Comment";
import EditCaptionForm from "../partials/EditCaptionForm";
import CommentForm from "../partials/CommentForm";
import SoloPicture from "./SoloPicture";

export default function Picture({ currentUser }) {
  // PARAMS
  const { id } = useParams();

  // STATE
  const [photo, setPhoto] = useState({
    comments: [],
  });
  const [ownerId, setOwnerId] = useState("");
  const [editCaption, setEditCaption] = useState(false);
  const [captionForm, setCaptionForm] = useState("");
  const [newComment, setNewComment] = useState("");
  const [actions, setActions] = useState(0); 
  const [soloPic, setSoloPic] = useState(false);

  // USE-EFFECT
  useEffect(() => {
    (async () => {
      try {
        // console.log('useEffect')
        const token = localStorage.getItem("jwt");
        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/pictures/${id}`,
          options
        );
        // console.log(response.data)
        setPhoto(response.data.foundPhoto);
        setOwnerId(response.data.ownerId);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [editCaption, actions]);

  // FUNCTIONS
  // Edits the caption of a picture corresponding to ID
  const putCaption = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/pictures/${id}`,
        { caption: captionForm },
        options
      );
      // console.log(response.data)
      setEditCaption(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Posts a comment to a individual picture -- requires token
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api-v1/comments",
        {
          name: currentUser.name,
          content: newComment,
          photoId: id,
          user_id: currentUser.id,
        },
        options
      );
      // console.log(response.data)
      setNewComment("");
      setActions(actions + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSoloPicture = () => {
    setSoloPic(!soloPic);
  };

  // COMPONENTS
  // Lists all comments of a indivdual picture post
  const commentsList = photo.comments.map((comment, idx) => {
    return (
      <Comment
        key={`comment-${idx}`}
        comment={comment}
        currentUser={currentUser}
        photoId={photo._id}
        actions={actions}
        setActions={setActions}
      />
    );
  });

  return (
    <div className="picture">
      {ownerId ? (
        <div>
          {soloPic && (
            <SoloPicture
              photoPublicId={photo.public_id}
              handleSoloPicture={handleSoloPicture}
            />
          )}
          <img
            onClick={handleSoloPicture}
            src={`https://res.cloudinary.com/dhs1wrqhp/image/upload/f_auto/${photo.public_id}`}
            alt="user photo"
            className="individual animate__animated animate__fadeIn"
          />
          {editCaption ? (
            <EditCaptionForm
              putCaption={putCaption}
              captionForm={captionForm}
              setCaptionForm={setCaptionForm}
            />
          ) : (
            <p>{photo.caption}</p>
          )}
          {currentUser ? (
            ownerId === currentUser.id ? (
              <button
                className="btn-edit"
                onClick={() => setEditCaption(!editCaption)}
              >
                {editCaption ? "back" : "edit caption"}
              </button>
            ) : null
          ) : null}
        </div>
      ) : null}
      {commentsList}
      <CommentForm
        handleSubmit={postComment}
        commentForm={newComment}
        setCommentForm={setNewComment}
      />
    </div>
  );
}
