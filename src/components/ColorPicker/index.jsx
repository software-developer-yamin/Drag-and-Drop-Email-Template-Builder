import { useState } from "react";
import { Popover } from "antd";
import { ChromePicker } from "react-color";
import PropTypes from "prop-types";

const ColorPicker = ({ color, setColor }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover
      zIndex={1070}
      content={
        <div className="select-none">
          <ChromePicker color={color} style={{ boxShadow: "none" }} onChange={setColor} />
        </div>
      }
      trigger="click"
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <button className="color-picker-button" style={{ background: color }}></button>
    </Popover>
  );
};

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  setColor: PropTypes.func.isRequired
};

export default ColorPicker;
