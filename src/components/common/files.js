import React, {useRef, useState} from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {InsertDriveFile} from '@material-ui/icons';

const CommonFileUpload = props => {
    const { onChange, input, label, disabled} = props;
    const [file, setFile] = useState(null);

    const useStyles = makeStyles(() => ({
        root: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            "& > *": {
                margin: 2,
            }
        },
        input: {
          display: "none",
        },
      }));

      const classes = useStyles();

      const uploadInputRef = useRef(null);

      const handleFileUpload = e => {
          const {target} = e;
          setFile(target.files[0])

         input.onChange(e);
         if (onChange) {
             onChange(e);
         }
      }
      
    return (
        <React.Fragment>
            <div className={classes.root}>
            <input
                ref={uploadInputRef}
                id={input.id}
                name={input.name}
                type="file"
                onChange={e => handleFileUpload(e)}
                className={classes.input}
            />
            <Tooltip title="Add File">
                <label htmlFor="addFile">
                    <IconButton
                        color="default"
                        aria-label="uploadFiles"
                        component="span"
                        disabled={disabled}
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                    >
                        <InsertDriveFile fontSize="large" />
                    </IconButton>
                </label>
            </Tooltip>
            <label>{file ? file.name : label}</label>. . .
            </div>
        </React.Fragment>
    )
}

export default CommonFileUpload;