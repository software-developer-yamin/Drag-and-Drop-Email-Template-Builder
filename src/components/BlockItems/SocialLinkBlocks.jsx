import { useContext } from "react";
import { GlobalContext } from "../../reducers";
import PropTypes from "prop-types";

const SocialLinkBlocks = ({ blockItem }) => {
  const { previewMode } = useContext(GlobalContext);
  const { list, imageWidth } = blockItem;
  const styles = previewMode === "desktop" ? blockItem.styles.desktop : { ...blockItem.styles.desktop, ...blockItem.styles.mobile };
  const contentStyles =
    previewMode === "desktop" ? blockItem.contentStyles?.desktop : { ...blockItem.contentStyles?.desktop, ...blockItem.contentStyles?.mobile };
  return (
    <div className="relative">
      <div style={contentStyles}>
        {list.map((socialLinkItem, index) => {
          const { image, title } = socialLinkItem;
          return (
            <div key={index} style={{ ...styles, display: "inline-block" }}>
              <img src={image} alt={title} style={{ width: imageWidth }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

SocialLinkBlocks.propTypes = {
  blockItem: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    imageWidth: PropTypes.number.isRequired,
    styles: PropTypes.shape({
      desktop: PropTypes.object.isRequired,
      mobile: PropTypes.object,
    }).isRequired,
    contentStyles: PropTypes.shape({
      desktop: PropTypes.object,
      mobile: PropTypes.object,
    }),
  }).isRequired,
};

export default SocialLinkBlocks;
