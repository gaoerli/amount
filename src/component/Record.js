import React, { Component } from "react";
import * as RecordAPI from "../utils/RecordAPI";

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleUpdateRecord = this.handleUpdateRecord.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  }

  // 修改编辑状态
  handleToggle(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      edit: !this.state.edit
    });
  }

  // 更新数据
  handleUpdateRecord(event) {
    event.preventDefault();
    event.stopPropagation();
    const newReact = {
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number.parseInt(this.refs.amount.value)
    };
    // console.log(newReact);
    RecordAPI.update(this.props.record.id, newReact)
      .then(result => {
        this.props.handleUpdate(this.props.record, result.data);
        this.setState({ edit: false });
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  /**删除 */
  handleDeleteRecord(event) {
    event.preventDefault();
    event.stopPropagation();
    RecordAPI.remove(this.props.record.id)
      .then(result => {
        console.log(result);
        this.props.handleDelete(this.props.record);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  // 默认情况
  recordRow() {
    const { date, title, amount } = this.props.record;
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>￥{amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleToggle}>
            编辑
          </button>
          <button className="btn btn-danger" onClick={this.handleDeleteRecord}>
            删除
          </button>
        </td>
      </tr>
    );
  }
  /**编辑状态 */
  recordForm() {
    const { date, title, amount } = this.props.record;
    return (
      <tr>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={date}
            ref="date"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={title}
            ref="title"
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            defaultValue={amount}
            ref="amount"
          />
        </td>
        <td>
          <button
            className="btn btn-info mr-1"
            onClick={this.handleUpdateRecord}
          >
            更新
          </button>
          <button className="btn btn-danger" onClick={this.handleToggle}>
            关闭
          </button>
        </td>
      </tr>
    );
  }
  render() {
    if (this.state.edit) {
      return this.recordForm();
    } else {
      return this.recordRow();
    }
  }
}
