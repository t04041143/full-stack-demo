import React, {PropTypes} from "react";
import {Alert} from "antd";
import QueueAnim from "rc-queue-anim";

export default class  extends React.Component {
  static propTypes = {
    errors: PropTypes.object.isRequired
  };

  render() {
    const errors = this.props.errors ? Object.keys(this.props.errors).map((key)=> {
      return (
        <Alert key={`${key}_error.code`} message={this.props.errors[key].msg}
               type="error" showIcon/>
      );
    }) : null;
    return (
      <QueueAnim type={'scale'}>
        {errors}
      </QueueAnim>
    );
  }
}
