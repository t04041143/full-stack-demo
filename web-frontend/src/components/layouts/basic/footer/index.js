import React from "react";
import "./footer.css";

export default class extends React.Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <h2>联系我们</h2>
            <div>
              <a target="_blank" href="javascript:;">
                反馈和建议
              </a>
            </div>
            <div>
              <a target="_blank" href="javascript:;">
                讨论
              </a>
            </div>
          </li>
        </ul>
      </footer>
    );
  }
}
