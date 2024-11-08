import PropTypes from "prop-types";

const Header = (props) => {
  const { emailEditorEl, setLanguage } = props;

  const exportHTML = () => {
    const html = emailEditorEl.current.exportHtml();
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.download = "email.html";
    a.href = URL.createObjectURL(blob);
    a.click();
  };

  const changeLanguage = (language) => () => {
    setLanguage(language);
  };

  return (
    <div className="dashboard-header">
      <div className="dashboard-header-title">Email Editor</div>
      <div className="dashboard-header-feature">
        <div className="dashboard-header-language">
          <span onClick={changeLanguage("en")}>EN</span>/
          <span onClick={changeLanguage("zh")}>BN</span>
        </div>
        <button className="dashboard-header-subtitle" onClick={exportHTML}>
          HTML
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  emailEditorEl: PropTypes.object.isRequired,
  setLanguage: PropTypes.func.isRequired,
};

export default Header;
