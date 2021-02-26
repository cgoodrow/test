import React from 'react';
import {formatDateUTCLocalWithTime} from 'utils/common';
import {Field} from 'react-final-form';
import {Button, Typography} from '@material-ui/core';
import CommonFieldSet from 'components/common/fieldset';
import Box from 'components/common/box';
import CommonTextField from 'components/common/text-field';
import CommonCheckField from 'components/common/checkfield';
import CommonDropDown from 'components/common/dropdown';
import CommonSwitch from 'components/common/switch';
import CommonNumberField from 'components/common/number-field';
import CommonTable from 'components/common/grid';
import CommonRadioButton from 'components/common/radiofield';
import CommonSlider from 'components/common/slider';
import CommonDatePicker from 'components/common/date-picker';
import CommonTextArea from 'components/common/textarea';
import CommonSearchComponent from 'components/common/search-component';

const data=[{name: 'SiteID', label: 'Site ID', type: 'textfield'}, {name: 'siteName', label: 'Site Name', type: 'textfield'}, {name: 'includeDeactivate', label: 'Include Deactivate', type: 'checkfield'}, {name: 'orgId', label: 'Org ID', type: 'selectField'}, {name: 'taskOrder', label: 'Task Order', type: 'selectField'}, {name: 'putawayEnabled', label: 'Putaway Enabled', type: 'selectField'}];

export default [
        {
            id: 'fieldset',
            type: 'COMPONENTS',
            name: 'fieldset',
            content: function content({ children }) { return (
            <CommonFieldSet legend='Search'>{children}</CommonFieldSet>)},
            children: [],
        },
        {
            id: 'box',
            type: 'COMPONENTS',
            name: 'box',
            content: function content({children}) {return (
                <Box>{children}</Box>
            )},
            children: [],
        },
        {
            id: 'textfield',
            type: 'INPUTS',
            name: 'textfield',
            content: <Field name="textfield" label="textfield" component={CommonTextField} disabled />,
        },
        {
            id: 'checkfield',
            type: 'INPUTS',
            name: 'checkfield',
            content: <Field name="checkfield" type="checkbox" label="checkfield" disabled component={CommonCheckField}/>
        },
        {
            id: 'dropdown',
            type: 'INPUTS',
            name: 'dropdown',
            content: <Field name="dropdown" label="dropdown" disabled component={CommonDropDown}/>
        },
        {
            id: 'switch',
            type: 'INPUTS',
            name: 'switch',
            content: <Field name="switch" label="switch" disabled component={CommonSwitch} />
        },
        {
            id: 'numberfield',
            type: 'INPUTS',
            name: 'numberfield',
            content: <Field name="numberfield" label="numberfield" disabled component={CommonNumberField}/>
        },
        {
            id: 'table',
            type: 'COMMON',
            name: 'table',
            content: <CommonTable data={[]} rows={[{name:  'table'}, {name: 'table'}]} />
        },
        {
            id: 'button',
            type: 'COMPONENTS',
            name: 'button',
            content: <Button type="button" variant="contained" color="primary">Button</Button>
        },
        {
            id: 'radio',
            type: 'INPUTS',
            name: 'radio',
            content: <Field type="radio" name="radio" label="radio" disabled component={CommonRadioButton} />
        },
        {
            id: 'slider',
            type: 'INPUTS',
            name: 'slider',
            content: <Field name="slider" label="slider" disabled component={CommonSlider}/>
        },
        {
            id: 'datepicker',
            type: 'INPUTS',
            name: 'datepicker',
            content: <Field
            disabled 
            readonly={true} 
            name="datepicker" 
            label="datepicker"
            defaultValue={formatDateUTCLocalWithTime(new Date())}
            component={CommonDatePicker} />

        },
        {
            id: 'textarea',
            type: 'INPUTS',
            name: 'textarea',
            content: <Field name='textarea' label='textarea' component={CommonTextArea} />
        },
        {
            id: 'h4',
            type: 'COMPONENTS',
            name: 'h4',
            content: <Typography variant="h4">Heading</Typography>
        },
        {
            id: 'searchComponent',
            type: 'COMMON',
            name: 'searchComponent',
            content: <CommonSearchComponent data={data} />
        }
]