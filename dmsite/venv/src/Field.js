/**
 * Created by christinadaley on 1/18/19.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './text-input-style.css';
export default class Field extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        locked: PropTypes.bool,
        focussed: PropTypes.bool,
        value: PropTypes.string,
        error: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        locked: false,
        focussed: false,
        value: '',
        error: '',
        label: '',
        predicted: '',
        onChange: () => '',
    };

    onChange = event => {
        const { id } = this.props;
        const value = event.target.value;
        this.setState({ value, error: '' });
        return this.props.onChange(id, value);
    }
    constructor(props) {
        super(props);
        this.state = {
            focussed: (props.locked && props.focussed) || false,
            value: props.value || '',
            error: props.error || '',
            label: props.label || '',
        };
    }

    render() {
        const { focussed, value, error, label } = this.state;
        const { id, type, locked } = this.props;
        const fieldClassName = `field ${(locked ? focussed : focussed || value) && 'focussed'} ${locked && !focussed && 'locked'}`;
        return (
            <div className={fieldClassName}>
                <input
                    id={id}
                    type="text"
                    value={value}
                    placeholder={label}
                    onChange={this.onChange}
                    onFocus={() => !locked && this.setState({ focussed: true })}
                    onBlur={() => !locked && this.setState({ focussed: false })}
                />
                <label htmlFor={id} className={error && 'error'}>
                    {error || label}
                </label>
            </div>
        );

    }
}