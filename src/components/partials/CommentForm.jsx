export default function CaptionForm({ handleSubmit, commentForm, setCommentForm }) {
    // Reused for edit and post of comment
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="newComment"></label>
                <input type="text" id="newComment" placeholder="Enter comment..." autoComplete='off' onChange={e => setCommentForm(e.target.value)} value={commentForm} />
                <button className='btn-sm' type="submit">Submit</button>
            </form>
        </>
    )
}