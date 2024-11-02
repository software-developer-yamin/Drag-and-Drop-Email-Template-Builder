import { useContext } from "react";
import { GlobalContext } from "../../reducers";
import PropTypes from "prop-types";

const DividerBlock = ({ blockItem }) => {
  const { previewMode } = useContext(GlobalContext);
  const styles = previewMode === "desktop" ? blockItem.styles.desktop : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const contentStyles =
    previewMode === "desktop" ? blockItem.contentStyles?.desktop : { ...blockItem.contentStyles?.desktop, ...blockItem.contentStyles?.mobile };

  return (
    <div className="relative">
      <div style={{ ...contentStyles }}>
        <div style={{ ...styles }}></div>
      </div>
    </div>
  );
};

DividerBlock.propTypes = {
  blockItem: PropTypes.shape({
    styles: PropTypes.object.isRequired,
    contentStyles: PropTypes.object,
  }).isRequired,
};

export default DividerBlock;
