import { useMemo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import useSection from "../../utils/useSection";
import classNames from "../../utils/classNames";
import { GlobalContext } from "../../reducers";
import PropTypes from "prop-types";

const InsertUnorderedList = ({ modifyText, setTextContent }) => {
  const { selectionRange, blockList } = useContext(GlobalContext);
  const { getSelectionNode } = useSection();

  const node = useMemo(() => {
    if (selectionRange) {
      return getSelectionNode(selectionRange.commonAncestorContainer, "ul");
    } else {
      return null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionRange, blockList]);

  return (
    <button
      className={classNames("rich-text-tools-button ", node && "rich-text-tools-button-active")}
      title="Insert"
      onClick={() => {
        modifyText("insertUnorderedList", false, null);
        setTextContent();
      }}
    >
      <FontAwesomeIcon icon={faListUl} className="rich-text-tools-button-icon" />
    </button>
  );
};

InsertUnorderedList.propTypes = {
  modifyText: PropTypes.func.isRequired,
  setTextContent: PropTypes.func.isRequired
};

export default InsertUnorderedList;
