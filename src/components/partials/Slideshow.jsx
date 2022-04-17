import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Slideshow({ user }) {
  const [imageIndex, setImageIndex] = useState(0);

  // Randomizes the index depending on the amount of photos uploaded by a user
  useEffect(() => {
    const picInt = setInterval(() => {
      setImageIndex(Math.floor(Math.random() * user.photos.length));
    }, 3000);
    return () => clearInterval(picInt)
  }, []);

  return (
    <Link to={`/profiles/${user._id}`} className="feed-link">
      <div className="polaroid animate__animated animate__fadeIn">
        <div className="polaroid-bg">
          <img
            src={
              !user.photos[0]
                ? `https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png`
                : `https://res.cloudinary.com/dhs1wrqhp/image/upload/w_700,h_700,c_fill/f_auto/${user.photos[imageIndex].public_id}`
            }
            alt="user photo"
            id="userImg"
            className="polaroid-image"
          />
        </div>
        <h3 className="marker">{user.name}</h3>
      </div>
    </Link>
  );
}
