import { useMemo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
import useSection from "../../utils/useSection";
import classNames from "../../utils/classNames";
import { GlobalContext } from "../../reducers";
import PropTypes from "prop-types";

const Italic = ({ modifyText, setTextContent }) => {
  const { selectionRange } = useContext(GlobalContext);
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, "i");
    } else {
      return null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionRange]);

  return (
    <button
      className={classNames("rich-text-tools-button ", node && "rich-text-tools-button-active")}
      title="斜体"
      onClick={() => {
        modifyText("italic", false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon icon={faItalic} className="rich-text-tools-button-icon" />
    </button>
  );
};


Italic.propTypes = {
  modifyText: PropTypes.func.isRequired,
  setTextContent: PropTypes.func.isRequired,
};

export default Italic;
