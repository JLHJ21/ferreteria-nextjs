const Footer = () => {
  return (
    <div className="container-fluid flex-fill pt-5">
      <footer className="d-flex flex-wrap justify-content-between align-items-center pt-3 mt-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary text-truncate">
            ©Página hecha por Jorge Heredia 2024
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="mailto:jorgeherediavzla@gmail.com"
            >
              <svg className="bi" width="24" height="24">
                {/*<use xlink:href="#email"></use>*/}
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-body-secondary"
              href="https://www.linkedin.com/in/jorge-luis-heredia-jaimes-053a3131b"
              target="_blank"
            >
              <svg className="bi" width="24" height="24">
                {/*<use xlink:href="#linkedin"></use>*/}
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
export default Footer;
