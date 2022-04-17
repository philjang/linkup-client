import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UploadProfilePoic({ currentUser }) {
  let navigate = useNavigate();

  // STATE
  const [formImg, setFormImg] = useState("");
  const [fileName, setFileName] = useState("");
  //   const [displayImg, setDisplayImg] = useState(
  //     "https://c.tenor.com/ga3h1_li7SUAAAAC/discord-loading.gif"
  //   );
  // const [msg, setMsg] = useState('')
  // console.log(currentUser);

  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(currentUser);
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      // multipart form data object
      const fd = new FormData();
      //   append the data
      fd.append("image", formImg);
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`,
        fd,
        options
      );
      navigate(`/profiles/${currentUser.id}`);
      //   <Navigate to={`/profiles/${currentUser.id}`} />
    } catch (err) {
      console.log(err);
      // setMsg('Go check the server console, there was an error')
    }
  };

  const handleChange = async (e) => {
    setFileName(e.target.files[0].name);
    // setDisplayImg("https://c.tenor.com/ga3h1_li7SUAAAAC/discord-loading.gif");
    setFormImg(e.target.files[0]);
  };

  //   useEffect(() => {
  //     (async () => {
  //       if (formImg) {
  //         try {
  //           const token = localStorage.getItem("jwt");
  //           const options = {
  //             headers: {
  //               Authorization: token,
  //             },
  //           };
  //           const fd = new FormData();
  //           fd.append("image", formImg);
  //           const response = await axios.post(
  //             `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser}`,
  //             fd,
  //             options
  //           );
  //           // console.log(response.data)
  //           setDisplayImg(response.data.cloudImage);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       }
  //     })();
  //   }, [formImg]);

  return (
    <div className="bg-light margin-lr">
      {/* <h2>Upload an Image</h2> */}
      <i className="fas fa-cloud-upload-alt"></i>
      <form onSubmit={handleSubmit} encType="multipart/form">
        <div className="column">
          <label htmlFor="image" className="image-upload">
            Choose File
          </label>
          <input
            // no value on this controlled form
            type="file"
            id="image"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {/* {formImg && <img src={displayImg} alt={fileName} />} */}
          <label id="file-name">{fileName}</label>
          <button className="btn" type="submit">
            Upload Picture
          </button>
        </div>
      </form>
    </div>
  );
}
