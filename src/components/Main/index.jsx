/* eslint-disable no-case-declarations */
import { useContext, useCallback, useEffect } from "react";
import { GlobalContext } from "../../reducers";
import { throttle, deepClone } from "../../utils/helpers";

import LeftSideBar from "../LeftSideBar";
import Preview from "../Preview";
import RightSetting from "../RightSetting";
import useTranslation from "../../translation";
import useDataSource from "../../configs/useDataSource";
import PropTypes from "prop-types";

const Main = ({ language }) => {
  const { blockList, setBlockList, currentItem, setCurrentItem, setIsDragStart, setLanguage } = useContext(GlobalContext);
  const { t } = useTranslation();
  const { getColumnConfig } = useDataSource();

  const defaultContentConfig = {
    name: t("drag_block_here"),
    key: "empty",
    width: "100%",
    styles: {
      desktop: {
        backgroundColor: "transparent",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
      },
      mobile: {},
    },
  };

  useEffect(() => {
    setLanguage(language);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const blurCurrentItem = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentItem(null);
  };
  const clearLabelStyles = () => {
    const dragLabelElements = document.getElementsByClassName("block-drag-label-content");
    Array.from(dragLabelElements).forEach((item) => {
      item.children[0].style.visibility = "hidden";
    });
  };

  const clearContentLabelStyles = () => {
    const dragContentLabelElements = document.getElementsByClassName("block-content-drag-label-content");
    Array.from(dragContentLabelElements).forEach((item) => {
      item.children[0].style.visibility = "hidden";
    });
  };

  const onDragOver = useCallback(
    throttle((event) => {
      event.preventDefault();
      event.stopPropagation();
      let { index } = event.target.dataset;
      switch (event.target.dataset.type) {
        case "empty-block":
          clearLabelStyles();
          clearContentLabelStyles();
          event.target.style.border = "1px dashed #2faade";
          break;

        case "drag-over-column":
          clearContentLabelStyles();
          // eslint-disable-next-line no-case-declarations
          const dragLabelElements = document.getElementsByClassName("block-drag-label-content");
          Array.from(dragLabelElements).forEach((item) => {
            if (Number(item.dataset.index) === Number(index)) {
              item.children[0].style.visibility = "visible";
            } else {
              item.children[0].style.visibility = "hidden";
            }
          });
          break;

        case "block-item-move":
          clearLabelStyles();
          const dragBlockItemElements = document.getElementsByClassName("block-content-drag-label-content");
          Array.from(dragBlockItemElements).forEach((item) => {
            if (item.dataset.index === index) {
              item.children[0].style.visibility = "visible";
            } else {
              item.children[0].style.visibility = "hidden";
            }
          });
          break;

        case "empty-block-item":
          clearLabelStyles();
          clearContentLabelStyles();
          const parentNode = event.target.parentNode;
          parentNode && parentNode.classList.contains("block-empty-content") && (parentNode.style.outlineStyle = "solid");
          break;
        default:
          clearLabelStyles();
          clearContentLabelStyles();
          break;
      }
    }, 30),
    []
  );

  const onDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { type } = event.target.dataset;
    setIsDragStart(false);
    switch (type) {
      case "empty-block":
        const newCurrentItem = currentItem.data.key !== "column" ? getColumnConfig(currentItem.data) : getColumnConfig();
        setBlockList([newCurrentItem], "add");
        setCurrentItem({ data: newCurrentItem, type: "edit", index: 0 });
        break;
      case "empty-block-item":
        clearEmptyContentStyles();
        const { index } = event.target.dataset;
        const newBlockList = deepClone(blockList);
        const indexArr = index.split("-");
        const blockIndex = indexArr[0];
        const itemIndex = indexArr[1];
        newBlockList[blockIndex].children[itemIndex].children = [currentItem.data];
        if (currentItem.type === "move") {
          const { index: oldIndex } = currentItem;
          const oldIndexArr = oldIndex.split("-");
          const oldBlockIndex = oldIndexArr[0];
          const oldItemIndex = oldIndexArr[1];
          const oldItem = newBlockList[oldBlockIndex].children[oldItemIndex];
          if (oldItem.children.length === 1) {
            newBlockList[oldBlockIndex].children[oldItemIndex].children = [defaultContentConfig];
          } else {
            newBlockList[oldBlockIndex].children[oldItemIndex].children = oldItem.children.filter((item, index) => index !== Number(oldIndexArr[2]));
          }
        }
        setCurrentItem({ ...currentItem, type: "edit", index });
        setBlockList([...newBlockList], "move");
        break;
      case "drag-over-column":
        {
          const { position, index } = event.target.dataset;
          const newBlockList = deepClone(blockList);
          let newCurrentItem = deepClone(currentItem);
          if (currentItem.type === "add") {
            newBlockList.splice(index, 0, currentItem.data);
            newCurrentItem = { ...currentItem, type: "edit", index };
          } else if (currentItem.type === "move") {
            const moveItem = newBlockList.splice(currentItem.index, 1)[0];
            newBlockList.splice(index, 0, moveItem);
            newCurrentItem = { ...currentItem, type: "edit", index: position === "top" ? Number(index) : index - 1 };
          }
          setCurrentItem({ ...newCurrentItem });
          setBlockList([...newBlockList], "move");
        }

        setTimeout(() => {
          const dragLabelElements = document.getElementsByClassName("block-drag-label-content");
          Array.from(dragLabelElements).forEach((item) => {
            item.children[0].style.visibility = "hidden";
          });
        }, 30);

        break;
      case "block-item-move":
        {
          const { position, index } = event.target.dataset;
          const newBlockList = deepClone(blockList);
          const indexArr = index.split("-");
          const blockIndex = indexArr[0];
          const contentIndex = indexArr[1];
          const itemIndex = indexArr[2];
          const blockItem = newBlockList[blockIndex].children[contentIndex].children;
          let newCurrentItem = deepClone(currentItem);
          if (currentItem.type === "add") {
            blockItem.splice(itemIndex, 0, currentItem.data);
            newCurrentItem = { ...currentItem, type: "edit", index };
          }
          if (currentItem.type === "move") {
            const oldIndexArr = currentItem.index.split("-");
            const oldBlockIndex = oldIndexArr[0];
            const oldContentIndex = oldIndexArr[1];
            const oldItemIndex = oldIndexArr[2];
            const oldItem = newBlockList[oldBlockIndex].children[oldContentIndex].children;
            if (oldBlockIndex === blockIndex && oldContentIndex === contentIndex) {

              if (oldItemIndex < itemIndex) {
                const moveItem = oldItem.splice(oldItemIndex, 1)[0];
                blockItem.splice(position === "top" ? Number(itemIndex) : itemIndex - 1, 0, moveItem);
                newCurrentItem = {
                  ...currentItem,
                  type: "edit",
                  index: `${blockIndex}-${contentIndex}-${position === "top" ? Number(itemIndex) : itemIndex - 1}`,
                };
              } else {
                const moveItem = oldItem.splice(oldItemIndex, 1)[0];
                blockItem.splice(position === "top" ? Number(itemIndex) : itemIndex, 0, moveItem);
                newCurrentItem = {
                  ...currentItem,
                  type: "edit",
                  index: `${blockIndex}-${contentIndex}-${position === "top" ? Number(itemIndex) : itemIndex}`,
                };
              }
            } else {

              const moveItem = oldItem.splice(oldItemIndex, 1)[0];
              blockItem.splice(position === "top" ? Number(itemIndex) : itemIndex, 0, moveItem);

              if (oldItem.length === 0) {
                newBlockList[oldBlockIndex].children[oldContentIndex].children = [defaultContentConfig];
              }
              newCurrentItem = {
                ...currentItem,
                type: "edit",
                index: `${blockIndex}-${contentIndex}-${position === "top" ? Number(itemIndex) : itemIndex}`,
              };
            }
          }
          setCurrentItem({ ...newCurrentItem });
          setBlockList([...newBlockList], "move");
        }
        setTimeout(() => {
          const dragBlockItemElements = document.getElementsByClassName("block-content-drag-label-content");
          Array.from(dragBlockItemElements).forEach((item) => {
            item.children[0].style.visibility = "hidden";
          });
        }, 30);
        break;
      default:
        break;
    }
  };

  const clearEmptyContentStyles = () => {
    document.querySelectorAll(".block-empty-content").forEach((item) => {
      item.style.outlineStyle = "";
    });
  };

  const clearStyles = () => {
    clearLabelStyles();
    clearContentLabelStyles();
    clearEmptyContentStyles();
  };

  const onDragLeave = (event) =>
    setTimeout(() => {
      switch (event.target.dataset.type) {
        case "empty-block":
          event.target.style.border = "";
          break;
        case "empty-block-item":
          event.target.parentNode && (event.target.parentNode.style.outlineStyle = "");
          break;
        case "drag-over-column":
        default:
          break;
      }
    }, 50);

  return (
    <>
      <div className="email-editor" onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}>
        <div className="email-editor-main" onClick={blurCurrentItem}>
          <LeftSideBar clearStyles={clearStyles} />
          <Preview clearStyles={clearStyles} />
          <RightSetting />
        </div>
      </div>
    </>
  );
};

Main.propTypes = {
  language: PropTypes.string.isRequired
};

export default Main;
