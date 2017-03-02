import React from "react";
import DocumentTitle from "react-document-title";
import {Link} from "dva/router";
import {Row, Col, Form, Input, Checkbox, Button} from "antd";
import {connect} from "dva";
import "../../../index.css";
import ErrorTips from "../../common/errors/error-tips";

@connect(
  (state) => ({...state.auth, user: state.user, error: state.error}),
)
class SigninPage extends React.Component {
  componentWillReceiveProps(nextProps) {
  }

  handleSubmit = (e)=> {
    e.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'auth/signin',
          payload: {
            flag: values['loginId'],
            type: 'username',
            password: values['password']
          }
        });
      }
    });
  };

  render() {
    const errorTips = this.props.error.auth ? <ErrorTips errors={this.props.error.auth}/> : null;

    const FormItem = Form.Item;

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    };

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

    return (
      <DocumentTitle title="登录">
        <Row className="simple-content" type="flex" justify="center" align="top">
          <Col className="signin">
            <Row type="flex" justify="center">
              <Col>
                <img src="../../../../images/logo1.png" alt="Metis Logo"/>
              </Col>
            </Row>
            <Row className="split-line"/>
            <Row type="flex" justify="center">
              <Col span={20}>
                <Form onSubmit={this.handleSubmit}>
                  <Row className="error">
                    <Col span={5}/>
                    <Col span={19}>
                      {errorTips}
                    </Col>
                  </Row>
                  <FormItem {...formItemLayout} label="用户名">
                    <Input type="text" {...loginIdProps}/>
                  </FormItem>
                  <FormItem {...formItemLayout} label="密码">
                    <Input type="password" {...passwordProps}/>
                  </FormItem>
                  <FormItem>
                    <Row type="flex" justify="space-between">
                      <Checkbox>下次自动登录</Checkbox>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </Row>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}

// 再包装一层
SigninPage = Form.create()(SigninPage);
export default SigninPage;
