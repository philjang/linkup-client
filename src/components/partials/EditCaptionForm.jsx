export default function EditCaptionForm({ putCaption, captionForm, setCaptionForm }) {
    return (
        <>
            <form onSubmit={putCaption}>
                <label htmlFor="newCaption"></label>
                <input type="text" id="newCaption" autoComplete='off' placeholder="Enter new caption..." onChange={e => setCaptionForm(e.target.value)} value={captionForm} />
                <button className='btn-sm' type="submit">Submit</button>
            </form>
        </>
    )
}