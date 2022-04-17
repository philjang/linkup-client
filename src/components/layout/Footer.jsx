export default function Footer() {
    return (
        <footer>
            <p>© Hygge Ltd. 2022</p>
            <div className="row">
                <div>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/phil-jang"><i className='fab fa-linkedin'></i></a>
                </div>
                <div>
                    <a target="_blank" rel="noreferrer" href="https://github.com/philjang/linkup_server"><i className="fab fa-github"></i></a>
                </div>
                <div>
                    <a href="mailto:philjang.pr@gmail.com"><i className='fas fa-envelope'></i></a>
                </div>
            </div>
        </footer>
    );
}
