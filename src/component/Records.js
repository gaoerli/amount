import React, { Component } from "react";
// import { getJSON } from "jquery";
import PropTypes from "prop-types";
// import axios from "axios";
import * as RecordsAPI from "../utils/RecordAPI";
import Record from "./Record";
import RecordForm from "./RecordForm";
import AmountBox from "./AmountBox";

export default class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      error: null,
      isLoaded: false
    };
    this.handleNewRecord = this.addRecord.bind(this);
    this.handleUpdate = this.updateRecord.bind(this);
    this.handleDelete = this.deleteRecord.bind(this);
  }

  componentDidMount() {
    // getJSON(" http://localhost:3000/records").then(
    //   response => this.setState({ records: response, isLoaded: true }),
    //   error =>
    //     this.setState({
    //       isLoaded: true,
    //       error: error.errorstatusText()
    //     })
    // );
    RecordsAPI.getAll()
      .then(response =>
        this.setState({
          records: response.data,
          isLoaded: true
        })
      )
      .catch(error =>
        this.setState({
          isLoaded: true,
          error: error.message
        })
      );
  }
  /**增 */
  addRecord(record) {
    this.setState({
      error: null,
      isLoaded: true,
      records: [...this.state.records, record]
    });
  }
  /**改 */
  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record); //初始位置
    console.log(recordIndex);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      };
    });
    console.log(newRecords);
    this.setState({
      records: newRecords
    });
  }
  /**删 */
  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter(
      (item, index) => index !== recordIndex
    );
    this.setState({
      records: newRecords
    });
  }

  /**收入 */
  credits() {
    let credits = this.state.records.filter(record => {
      return record.amount >= 0;
    });
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount);
    }, 0);
  }

  /**支出 */

  debits() {
    let credits = this.state.records.filter(record => {
      return record.amount < 0;
    });
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount);
    }, 0);
  }

  /**净收入 */
  balance() {
    return this.credits() + this.debits();
  }

  render() {
    /** Es6语法 */
    const { error, isLoaded, records } = this.state;
    let RecordComponment;
    if (error) {
      RecordComponment = <div>Error: {error}</div>;
    } else if (!isLoaded) {
      RecordComponment = <div>Loading</div>;
    } else if (records.length > 0) {
      RecordComponment = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>日期</th>
              <th>类型</th>
              <th>金额</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <Record
                key={record.id}
                record={record}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="收入" type="success" amount={this.credits()} />
          <AmountBox text="支出" type="danger" amount={this.debits()} />
          <AmountBox text="净收入" type="info" amount={this.balance()} />
        </div>
        <RecordForm handleNewRecord={this.handleNewRecord} />
        {RecordComponment}
      </div>
    );
  }
}

/**检查无效 */
Records.protoTypes = {
  id: PropTypes.string,
  data: PropTypes.string,
  title: PropTypes.string,
  amount: PropTypes.number
};
