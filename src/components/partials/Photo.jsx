import { Link } from "react-router-dom";

export default function Photo({ photo, handleDelete, showEdit, cloudImage }) {
  return (
    <div className={showEdit ? 'polaroid animate__animated animate__infinite animate__pulse' : 'polaroid animate__animated animate__fadeIn'}>
      <Link to={`/pictures/${photo._id}`}>
        <div className="polaroid-bg">
          <img
            src={cloudImage}
            key={photo.public_id}
            className="polaroid-image"
          />
        </div>
      </Link>
      {showEdit && (
        <button
          onClick={() => handleDelete(photo._id)}
          className="btn-dlt animate__animated animate__infinite animate__swing"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  );
}
