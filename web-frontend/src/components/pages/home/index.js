import React from "react";
import {Row, Col} from "antd";
import DocumentTitle from "react-document-title";

class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <DocumentTitle title='首页'>
        <Row>
          <Col>
            <span>我是首页</span>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}

export default HomePage;
