import React, { Component } from "react";
import * as RecordAPI from "../utils/RecordAPI";

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    };
    this.handleInputChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 按钮控制
  value() {
    return this.state.date && this.state.title && this.state.amount;
  }

  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState(((obj = {}), (obj["" + name] = event.target.value), obj));
    event.stopPropagation();
    event.preventDefault();
  }

  handleSubmit(event) {
    const dates = {
      date: this.state.date,
      title: this.state.title,
      amount: Number.parseInt(this.state.amount)
    };
    RecordAPI.creat(dates)
      .then(result => {
        this.props.handleNewRecord(result.data);
        this.setState({
          date: "",
          title: "",
          amount: ""
        });
      })
      .catch(err => console.log(err.message));

    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { date, title, amount } = this.state;
    return (
      <form className="form-inline mb-4" onSubmit={this.handleSubmit}>
        <div className="form-group mr-1">
          <input
            type="date"
            className="form-control"
            value={date}
            id="dates"
            placeholder="日期"
            name="date"
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group  mr-1">
          <input
            type="text"
            className="form-control"
            value={title}
            name="title"
            placeholder="类型"
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group  mr-1">
          <input
            type="number"
            className="form-control"
            value={amount}
            name="amount"
            placeholder="金额"
            autoComplete="off"
            onChange={this.handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary ml-1 "
          disabled={!this.value()}
        >
          新建记录
        </button>
      </form>
    );
  }
}
