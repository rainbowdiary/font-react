/**
 * 功能：设计表格，让表格固定首行首列
 * 思路： 首行第一列和其他固定列分开写
 */

import * as React from "react";
import "./index.css";
class Table extends React.Component<any, any> {
  private pages: any;
  private firstColLayer: any;
  private firstRowLayer: any;
  private tableContainer: any;

  componentDidMount() {
    console.log("====================================");
    console.log("tableContainer", this.refs.tableContainer);
    console.log("====================================");
    let maxHeight = window.screen.height;
    document.body.style.overflow = "hidden";
    // this.$refs.right.style.width =
    // "" + this.$refs.table.offsetWidth - 107 + "px"; //这里的减107是减去左侧div宽度
    // console.log(this.placeholderTop);
  }

  public tableDivScroll = (event: any) => {
    const $target: any = this.tableContainer;
    console.log("firstRowLayer", this.firstRowLayer);
    let $targetLeft: any = this.firstRowLayer;
    let $left = $targetLeft.scrollLeft;
    // 首行固定
    $left = $target.scrollLeft;
    // 首列固定
    let $first: any = this.firstColLayer;
    let firstLeft: any = $first.scrollTop;
    firstLeft = $target.scrollTop;
  };
  render() {
    const { dataSheet, tableHeader } = this.props;
    return (
      <div
        className="pages"
        ref={(ref) => {
          this.pages = ref;
        }}
      >
        <div className="content" ref="table">
          {/* <!--首列固定--> */}
          <div className="left-content">
            <div className="table-head">
              <table className="full-table">
                <thead>
                  <tr>
                    {tableHeader.map((item: any[], index: number) => {
                      return (
                        index === 0 && (
                          <th>
                            <p>{item}</p>
                          </th>
                        )
                      );
                    })}
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table-left">
              {/* <div className="table" ref="firstColLayer"> */}
              <div
                className="table"
                ref={(ref) => {
                  this.firstColLayer = ref;
                }}
              >
                <table className="full-table">
                  <tbody>
                    {dataSheet.map((dataTr: any, index: number) => {
                      return (
                        <tr key={index + 1}>
                          {dataTr.map((item: any) => {
                            return (
                              <td>
                                <p>{item}</p>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="right-content" ref="right">
            {/* <!--首行固定--> */}
            {/* <div className="table-head" ref="firstRowLayer"> */}
            <div
              className="table-head"
              ref={(ref) => {
                this.firstRowLayer = ref;
              }}
            >
              <table className="full-table">
                <thead>
                  <tr>
                    {tableHeader.map((item: any[], index: number) => {
                      return (
                        index !== 0 && (
                          <th>
                            <p>{item}</p>
                          </th>
                        )
                      );
                    })}
                  </tr>
                </thead>
              </table>
            </div>
            {/* <!--正常表格内容(只有表格内容，没有表头和首列)--> */}
            <div
              className="table"
              style={{ overflow: "scroll" }}
              // ref="tableContainer"
              ref={(ref) => {
                this.tableContainer = ref;
              }}
              onScroll={this.tableDivScroll}
            >
              <table className="content-table">
                <tbody ref="tbody">
                  {dataSheet.map((dataTr: any, index: number) => {
                    return (
                      <tr key={index + 1}>
                        {dataTr.map((item: any, index: number) => {
                          return (
                            index !== 0 && (
                              <td>
                                <p>{item}</p>
                              </td>
                            )
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
