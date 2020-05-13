import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message, Modal } from 'antd'
import { reqGetProducts, reqSearchProduct, reqDeleteProduct, reqUpdateProductStatus } from '../../api';
import "./index.less";
const { Option } = Select;

export default class Product extends Component {
  state = {
    products: [],
    total: 0,
    searchType: "productName",
    searchName: "",
    pageNum: 1,
    pageSize: 3
  }
  // 定义是否点击搜索
  isSearch = false;
  // 定义表头
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      // dataIndex: 'status', 需要状态和商品id
      render: (product) => {
        return (
          <div>
            <Button type="primary" onClick={this.UpdateProductStatus(product)}>{product.status === 1 ? "上架" : "下架"}</Button>
            &nbsp;&nbsp;&nbsp;
            {product.status === 1 ? "已上架" : "已下架"}
          </div>
        )
      }
    },
    {
      title: '操作',
      // dataIndex: 'option',
      render: (product) => (
        <div>
          <Button type="link" onClick={this.showProductDetail(product)}>详情</Button>
          <Button type="link" onClick={this.showUpdateProduct(product)}>修改</Button>
          <Button type="link" onClick={this.showDeleteProduct(product)}>删除</Button>
        </div>
      ),

    },
  ];
  // 获取搜索类型
  searchTypeChange = (searchType) => {
    this.setState({
      searchType
    })
  }
  // 获取搜索关键字
  changeKeyWord = (e) => {
    this.setState({
      searchName: e.target.value.trim()
    })
  }
  /*
    1. 什么情况搜索商品，什么情况全部商品
      - 看是否有searchValue
    2. 如果在第二页，点击搜索，显示的是第一页数据
      - 原因：搜索传递的参数固定是 1 3 --> 永远搜的是第一页 3条数据
      - 解决：将 current当前页数 受控起来
    2.1 点击pageSize也会导致问题:监控total为pageSize
    3. 输入iphone，没有点击搜索按钮。 不按照关键字去搜，而搜全部商品（一定要点击搜索按钮，才按照关键字去搜）  
      问题二：第一次输入内容1，点击搜索。 第二次输入内容2，没有点击搜索。 搜索关键字是内容1还是内容2
      总结：必须点击搜索按钮才能搜索
  */
  // 点击搜索
  Search = () => {
    this.isSearch = true;
    const { pageNum, pageSize } = this.state
    // 发送搜索请求
    this.getProducts(pageNum, pageSize);
  }
  // 上架/下架 状态更新
  UpdateProductStatus = (product) => {
    return () => {
      console.log(product);
      // 1 : 上架  2：下架  是1变2，是2变1  
      const { _id } = product
      const productId = _id;
      const status = 3 - product.status
      // 更新后端数据
      reqUpdateProductStatus(productId, status).then(() => {
        message.success("状态更新成功~")
        // 跟新前台数据
        this.setState({
          products: this.state.products.map((product) => {
            if (product._id === productId) {
              return { ...product, status } //结构赋值，修改同名属性的值
            }
            return product
          })
        })
      })
    }
  }
  // 点击删除商品
  showDeleteProduct = (product) => {
    return () => {
      Modal.confirm({
        title: `您确认要删除${product.name}吗?`,
        onOk: async () => {
          const productId = product._id
          // 发送删除商品请求
          await reqDeleteProduct(productId)
          // 修改前台状态数据
          this.setState({
            products: this.state.products.filter((product) => product._id !== productId)
          })
          message.success(`${product.name}删除成功~`)

        },
      })
    }
  }
  // 点击修改商品
  showUpdateProduct = (product) => {
    return () => {
      // console.log(product); //{status: 1, _id: "5ddcace35b54da0320735c29", categoryId: "5ddcac4570cb1267ccc6aba4", name: "oppo", price: 3000, …
      // 跳转ProductFrom组件
      // push 接受第二个参数，组件可以通过location.state获取
      this.props.history.push("/product/update/" + product._id, product)
      // 发送请求更新后台数据
      // 更新前端状态数据
    }
  }
  // 请求商品列表
  getProducts = async (pageNum, pageSize) => {
    const { searchType, searchName } = this.state
    //有返回结果  //{pageNum: 1, total: 3, pageSize: 3, list: Array
    let result = null;
    if (this.isSearch) {
      // 有搜索关键字就搜索
      console.log(222, pageNum, pageSize);

      result = await reqSearchProduct({ searchType, searchName, pageNum, pageSize })
      message.success("搜索完成")

    } else {
      // 全部搜索
      result = await reqGetProducts(pageNum, pageSize)
    }
    this.setState({
      products: result.list,
      total: result.total,
      pageNum,
      pageSize
    })
  }
  componentDidMount() {
    // 请求商品列表
    this.getProducts(1, 3)
  }
  // 添加商品
  showAddProductForm = () => {
    // 跳转product/add
    this.props.history.push("/product/add")
  }
  // 商品详情
  showProductDetail = (product) => {
    return () => {
      // 1. 传递当前product给详情组件
      // 2. 跳转到详情组件页面
      // 使用history.push接收第二个参数，子路由可以通过location.state拿到数据
      this.props.history.push("/product/" + product._id, product)
    }
  }

  render() {
    const { products, total, pageNum, pageSize } = this.state
    return (
      <div>
        <Card
          title={<div>
            <Select defaultValue="根据商品名称" style={{ width: 120 }} onChange={this.searchTypeChange}>
              <Option value="productName">根据商品名称</Option>
              <Option value="productDesc">根据商品描述</Option>
            </Select>
            <Input
              placeholder="关键字"
              style={{ width: 200 }}
              className="product-input"
              onChange={this.changeKeyWord}
            />
            <Button type="primary" onClick={this.Search}>搜索</Button>
          </div>
          }
          extra={<Button type="primary" onClick={this.showAddProductForm}><Icon type="plus" />添加商品</Button>}
        >
          <Table
            columns={this.columns}
            dataSource={products}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              pageSize,
              total,  //页码总页数
              current: pageNum,
              onChange: this.getProducts,  // (pageNum,pageSize)=>{this.reqGetProducts(pageNum,pageSize)}参数是改变后的页码及每页条数
              onShowSizeChange: this.getProducts  //pageSize 变化的回调	
            }}
          />
        </Card>
      </div>
    )
  }
}
