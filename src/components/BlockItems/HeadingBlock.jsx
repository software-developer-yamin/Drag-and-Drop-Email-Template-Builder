import { useContext } from "react";
import { GlobalContext } from "../../reducers";
import RichTextLayout from "../RichText/RichTextLayout";
import { useMemo } from "react";
import PropTypes from "prop-types";

const HeadingBlock = (props) => {
  const { index, blockItem } = props;
  const { currentItem, previewMode, actionType } = useContext(GlobalContext);
  const styles = previewMode === "desktop" ? blockItem.styles.desktop : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const isEdit = currentItem && currentItem.index === index;
  const richTextElement = useMemo(() => <RichTextLayout {...props} />, [isEdit, actionType]);

  return isEdit ? richTextElement : <div style={{ ...styles }} dangerouslySetInnerHTML={{ __html: blockItem.text }}></div>;
};

HeadingBlock.propTypes = {
  index: PropTypes.number.isRequired,
  blockItem: PropTypes.shape({
    text: PropTypes.string,
    styles: PropTypes.shape({
      desktop: PropTypes.object,
      mobile: PropTypes.object
    })
  }).isRequired
};

export default HeadingBlock;
