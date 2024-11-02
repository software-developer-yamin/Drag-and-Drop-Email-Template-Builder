import { useContext } from "react";
import { GlobalContext } from "../../reducers";
import RichTextLayout from "../RichText/RichTextLayout";
import { useMemo } from "react";
import PropTypes from "prop-types";

const TextBlock = (props) => {
  const { index, blockItem } = props;
  const { currentItem, previewMode, actionType } = useContext(GlobalContext);
  const styles = previewMode === "desktop" ? blockItem.styles.desktop : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const isEdit = currentItem && currentItem.index === index;
  const richTextElement = useMemo(() => <RichTextLayout {...props} />, [isEdit, actionType]);

  return isEdit ? richTextElement : <div style={{ ...styles }} dangerouslySetInnerHTML={{ __html: blockItem.text }}></div>;
};

TextBlock.propTypes = {
  index: PropTypes.number.isRequired,
  blockItem: PropTypes.shape({
    text: PropTypes.string.isRequired,
    styles: PropTypes.shape({
      desktop: PropTypes.object.isRequired,
      mobile: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TextBlock;
