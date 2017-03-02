import React from "react";
import DocumentTitle from "react-document-title";
import {Row, Col, Form, Input, Button} from "antd";
import {routerRedux} from "dva/router";
import {connect} from "dva";

@connect(
  (state) => ({...state.user, captcha: state.captcha, error: state.error}),
)
class SignupInfoPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    // TODO 被路由验证替代 如果验证通过，则跳转到填写信息页
    if (!nextProps.details.roles.guest) {
      this.props.dispatch({type: 'menu/active', payload: {menu: 'main', key: 'main_nav_home'}});
      this.props.dispatch(routerRedux.push('/'));
    }
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'user/signup',
          payload: {
            captcha: this.props.captcha.value,
            identityFlag: this.props.captcha.receiverId,
            identityType: this.props.captcha.receiverType,
            password: values['password']
          }
        });
      }
    });
  };

  handleReset = (e)=> {
    e.preventDefault();
    this.props.form.resetFields();
  };

  validateRePassword = (rule, value, callback)=> {
    if (value && value !== this.props.form.getFieldValue('password')) {
      callback('两次输入必须一致！');
    } else {
      callback();
    }
  };

  render() {
    const FormItem = Form.Item;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };

    const {getFieldProps} = this.props.form;

    const passwordProps = getFieldProps('password', {
      rules: [
        {required: true, min: 6, max: 20, message: '密码为6至20个字符'}
      ]
    });

    const rePasswordProps = getFieldProps('rePassword', {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '请再次输入密码'
        },
        {
          validator: this.validateRePassword
        }
      ]
    });

    return (
      <DocumentTitle title="填写注册信息">
        <Row>
          <Col lg={6} md={6} sm={0}>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="密码" autoComplete="off">
                <Input {...passwordProps} type="password"/>
              </FormItem>
              <FormItem {...formItemLayout} label="确认密码" autoComplete="off">
                <Input {...rePasswordProps} type="password"/>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit">注册</Button>
                <Button type="button" onClick={this.handleReset}>重置</Button>
              </FormItem>
            </Form>
          </Col>
          <Col lg={6} md={6} sm={0}>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}

// 再包装一层
SignupInfoPage = Form.create()(SignupInfoPage);
export default SignupInfoPage;
