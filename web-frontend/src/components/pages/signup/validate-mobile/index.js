import React from "react";
import {Row, Col, Form, Input, Button} from "antd";
import {connect} from "dva";
import {routerRedux} from "dva/router";
import DocumentTitle from "react-document-title";
import ErrorTips from "../../../errors/error-tips";

@connect(
  (state) => ({...state.captcha, error: state.error}),
)
export default class ValidateMobilePage extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.dispatch({type: 'captcha/restore'});
  }

  componentWillReceiveProps(nextProps) {
    // 如果验证通过，则跳转到填写信息页
    if (nextProps.isVerified) {
      this.props.dispatch(routerRedux.push('/signup/info'));
    }
  }

  mobileExisted = (rule, value, callback)=> {
    // todo
    //console.log('检查手机是否已经存在');
    callback();
  };

  handleGetCaptcha = (e)=> {
    e.preventDefault();

    const {validateFields} = this.props.form;
    validateFields(['mobile'], {}, (errors, values)=> {
      if (!errors) {
        this.props.dispatch({
          type: 'captcha/get',
          payload: {
            receiverId: values['mobile'],
            receiverType: 'mobile',
            purpose: 'register'
          }
        });
      }
    });
  };

  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.dispatch({
          type: 'captcha/validate',
          payload: {
            receiverId: values['mobile'],
            receiverType: 'mobile',
            captcha: values['captcha'],
            purpose: 'register'
          }
        });
      }
    });
  };

  render() {
    const FormItem = Form.Item;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14}
    };

    const {getFieldProps} = this.props.form;

    const mobileProps = getFieldProps('mobile', {
      rules: [
        {required: true, pattern: /^\d{11}$/, message: '请输入正确的手机号码'},
        {validator: this.mobileExisted}
      ]
    });

    const captchaProps = getFieldProps('captcha', {
      rules: [
        {required: true, pattern: /^\d{6}$/, message: '请输入验证码'}
      ]
    });

    const errorTips = this.props.error.captcha ? <ErrorTips errors={this.props.error.captcha}/> : null;

    return (
      <DocumentTitle title='验证手机'>
        <Row>
          <Col lg={6} md={6} sm={0}/>
          <Col lg={12} md={12} sm={24}>
            <Form horizontal onSubmit={this.handleSubmit}>
              <Row>
                <Col md={6}/>
                <Col md={14}>
                  {errorTips}
                </Col>
              </Row>
              <FormItem {...formItemLayout} label="手机">
                <Input {...mobileProps} type="text" autoComplete="off"/>
              </FormItem>
              <FormItem {...formItemLayout} label="验证码">
                <Input {...captchaProps} type="text" autoComplete="off" style={{ width: '50%', marginRight: 8 }}/>
                <Button disabled={this.props.disabled} onClick={this.handleGetCaptcha}>
                  {this.props.tips}
                </Button>
              </FormItem>
              <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                <Button type="primary" htmlType="submit">验证</Button>
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
ValidateMobilePage = Form.create()(ValidateMobilePage);
export default ValidateMobilePage;
