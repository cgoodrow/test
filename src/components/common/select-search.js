import React from 'react';
import AsyncSelect from 'react-select/async';

const CommonSelectSearch = ({ input, label, handleOptions, loadedOptions, onChange, value, defaultMenuIsOpen, isMulti, defaultOptions, disabled }) => {

    const customStyles = {
        container: styles => ({...styles, width: '100%'}),
        menu: styles => ({...styles, zIndex: 9999 }),
    };
    return (
        <React.Fragment>
            <AsyncSelect
                placeholder={label}
                cacheOptions
                value={input.value || value}
                loadOptions={loadedOptions}
                onChange={(e) => onChange ? onChange(e) : input.onChange(e)}
                onInputChange={handleOptions}
                defaultMenuIsOpen={defaultMenuIsOpen}
                styles={customStyles}
                isClearable
                isMulti={isMulti}
                defaultOptions={defaultOptions}
                isDisabled={disabled}
            />
        </React.Fragment>
    )
}

export default CommonSelectSearch;