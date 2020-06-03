import React, { PureComponent, Fragment } from "react";
import { Input, InputNumber, Button } from "antd";

// var abc;
export default class Index extends PureComponent {
  state = {
    num: "",
    numV: "",
  };
  hanlderSubmit = () => {
    if (!this.state.num) {
      alert("请输入金额");
    } else {
      //100.50
      let moneyvalue = this.state.num + "";
      //[100]
      let moneyarr = moneyvalue.split(".");
      //moneyarr[1] =5
      if (moneyarr.length == 2) {
        //indexloc =1
        let indexloc = moneyarr[1].length;
        //moneyvalue = 100.50
        for (let i = 0; i < 2 - indexloc; i++) {
          moneyvalue += 0;
        }
      } else {
        moneyvalue += "00";
      }
      alert("充值成功: " + moneyvalue);
    }
  };
  handleChange = (e) => {
    const val = e.target.value;
    let aa = val.replace(/¥/, "");
    let newVal;
    // 1.）开头字符有要求
    if (
      /^[1-9][0-9]*([.][0-9]{1,2})?$/.test(aa) ||
      /^[1-9][0-9]*\.$/.test(aa)
    ) {
      newVal = `¥` + aa;
      console.log(true);
    } else {
      console.log(false);
      alert("输入有误，请重新输入");
      newVal = "";
    }
    // let newVal = `¥${aa}`;
    console.log(newVal);
    this.setState({
      num: newVal,
    });
  };
  handleChangeV = (aaa) => {
    this.setState({
      num: "aa",
    });
  };
  render() {
    return (
      <Fragment>
        <div>
          {/* <input onChange={this.handleChangeV}></input> */}
          {/* <InputNumber
            min={100}
            style={{ width: "300px" }}
            onChange={this.handleChange}
          /> */}
        </div>
        <Input
          style={{ width: "300px" }}
          placeholder="¥100.00"
          onChange={this.handleChange}
          value={this.state.num}
        />
        <div>
          <Button onClick={this.hanlderSubmit}>提交</Button>
        </div>
      </Fragment>
    );
  }
}
