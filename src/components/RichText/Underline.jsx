import { useMemo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnderline } from "@fortawesome/free-solid-svg-icons";
import useSection from "../../utils/useSection";
import classNames from "../../utils/classNames";
import { GlobalContext } from "../../reducers";
import PropTypes from "prop-types";

const Underline = ({ modifyText, setTextContent }) => {
  const { selectionRange } = useContext(GlobalContext);
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, "u");
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionRange]);

  return (
    <button
      className={classNames(
        "rich-text-tools-button ",
        node && "rich-text-tools-button-active"
      )}
      title="underline"
      onClick={() => {
        modifyText("underline", false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon
        icon={faUnderline}
        className="rich-text-tools-button-icon"
      />
    </button>
  );
};

Underline.propTypes = {
  modifyText: PropTypes.func.isRequired,
  setTextContent: PropTypes.func.isRequired,
};

export default Underline;
