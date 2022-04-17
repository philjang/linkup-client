export default function PostForm({ form, setForm, addPost}) {
    return (
        <>
            <form onSubmit={addPost}>
                <label htmlFor='content'></label>
                <input id='content' type='text' placeholder='Enter a new post...' autoComplete='off' onChange={e => setForm(e.target.value)} value={form}/>
                <button type="submit">Post</button>
            </form>
        </>
    )
}