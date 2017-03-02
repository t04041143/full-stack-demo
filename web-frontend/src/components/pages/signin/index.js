import React from "react";
import DocumentTitle from "react-document-title";
import {Link, routerRedux} from "dva/router";
import {Row, Col, Form, Input, Button} from "antd";
import {connect} from "dva";
import ErrorTips from "../../errors/error-tips";

@connect(
  (state) => ({...state.auth, user: state.user, error: state.error}),
)
class SigninPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    // 如果验证通过，则跳转到填写信息页
    if (!nextProps.user.details.roles.guest) {
      this.props.dispatch({type: 'menu/active', payload: {menu: 'main', key: 'main_nav_home'}});
      this.props.dispatch(routerRedux.push('/'));
    }
  }

  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'auth/signin',
          payload: {
            flag: values['loginId'],
            type: 'mobile',
            password: values['password']
          }
        });
      }
    });
  };

  render() {
    const {getFieldProps} = this.props.form;

    const loginIdProps = getFieldProps('loginId', {
      rules: [
        {required: true, message: '请输入登录账号'}
      ]
    });

    const passwordProps = getFieldProps('password', {
      rules: [
        {required: true, min: 6, max: 20, message: '密码为6至20个字符'}
      ]
    });

    const FormItem = Form.Item;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };

    const errorTips = this.props.error.auth ? <ErrorTips errors={this.props.error.auth}/> : null;

    return (
      <DocumentTitle title="登录">
        <Row>
          <Col lg={6} md={6} sm={0}>
          </Col>
          <Col lg={12} md={12} sm={24}>
            <Form horizontal onSubmit={this.handleSubmit}>
              <Row>
                <Col md={6}/>
                <Col md={14}>
                  {errorTips}
                </Col>
              </Row>
              <FormItem {...formItemLayout} label="用户名">
                <Input type="text" placeholder="请输入用户名" {...loginIdProps}/>
              </FormItem>
              <FormItem {...formItemLayout} label="密码">
                <Input type="password" placeholder="请输入密码" {...passwordProps}/>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit">登录</Button>
                <Link style={{ marginLeft: 24 }} to="/signup/validate-mobile">没有账号，请注册</Link>
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
SigninPage = Form.create()(SigninPage);
export default SigninPage;
