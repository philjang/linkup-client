export default function SoloPicture({ photoPublicId, handleSoloPicture }) {
  return (
    <div className="solo-pic-background">
      <img
        onClick={handleSoloPicture}
        src={`https://res.cloudinary.com/dhs1wrqhp/image/upload/f_auto/${photoPublicId}`}
        alt="user photo"
        className="solo animate__animated animate__fadeIn"
      />
    </div>
  );
}
