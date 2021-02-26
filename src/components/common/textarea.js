import React from "react";
import { TextareaAutosize, InputLabel } from "@material-ui/core";

const Textarea = (props) => {
  const { input, label, disabled, placeholder, minHeight = 50 } = props;

  const style = {
    minWidth: '99%',
    minHeight: minHeight,
    border: 'solid 1px rgba(0,0,0,.25)',
    borderRadius: 4,
    backgroundColor: 'inherit',
  }

  const root = {
    width: '100%',
    textAlign: 'left',
  }

  return (
    <div style={root}>
      {label && (
        <InputLabel style={{ color: "#000" }} id="demo-simple-select-label">
          {label}
        </InputLabel>
      )}
      <TextareaAutosize disabled={disabled} placeholder={placeholder} onChange={e => input.onChange(e)} value={input.value} style={style} size="small" aria-label="empty textarea" />
    </div>
  );
};

export default Textarea;
