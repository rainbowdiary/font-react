import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getCategoriesAsync, addCategoryAsync, updateCategoryAsync, deleteCategoryAsync } from '../../redux/action-creator/category'
import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from "./update-category-form";
@connect(state => ({ categories: state.categories }), { getCategoriesAsync, addCategoryAsync, updateCategoryAsync, deleteCategoryAsync })
class Category extends Component {
  state = {
    addCategoryVisible: false, //定义添加商品对话的显示与隐藏
    updateCategoryVisible: false,
    category: {}  //当前选中的列表 {_id: "5dda77097bea542578db31fc", name: "123", __v: 0}
  }
  componentDidMount() {
    // 获取分类列表
    this.props.getCategoriesAsync()
  }
  // 表格的列
  columns = [
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      // className: 'option', //添加类名
      // dataIndex: 'categoryName', //data的属性，如果不需要就不传
      // render: text => <a>{text}</a>, //指定表中数据如何渲染
      render: (category) => {
        // console.log(category); //打印当前显示的数据
        return (<div>
          <Button type="link" onClick={this.showUpdateCategory(category)}>修改分类</Button>
          <Button type="link" onClick={this.showDeleteCategory(category)}> 删除分类</Button>
        </div>)
      },
    },
  ];
  // 点击删除分类按钮
  showDeleteCategory = (category) => {
    return () => {
      this.DeleteCategory(category)
    }
  }
  // 删除分类
  DeleteCategory = (category) => {
    Modal.confirm({
      title: '您确认要删除当前分类吗?',
      onOk: () => { //普通函数this指向有问题
        console.log('OK', category);
        //发送请求删除分类
        console.log(category._id);

        this.props.deleteCategoryAsync(category._id)
          .then(() => {
            message.success(`${category.name}分类删除成功!`)
          })
      }
    });
  }
  // 点击添加分类按钮
  showAddCategory = () => {
    this.setState({
      addCategoryVisible: true
    })
  }
  //点击修改分类按钮
  //关键代码！！ 一上来已经全部渲染完成，函数被调用三次，每次点击调用函数，产生三个函数，闭包里面有有三个category，点击的时候从闭包中拿到当前那个
  showUpdateCategory = (category) => {
    return () => {
      // console.log(category);// 闭包获取到当前点击的列表项
      this.setState({
        updateCategoryVisible: true,
        category  //拿到选中的商品信息
      })
    }
  }
  // 点击OK，添加分类,
  addCategory = () => {
    // Form表单绑定wrappedComponentRef拿到Form子组件的实例对象，拿到校验后的数据
    // console.log(this.addCategoryForm);
    const { props: { form: { validateFields } } } = this.addCategoryForm;
    validateFields((err, values) => {
      if (!err) {
        // 发送添加商品请求，更新redux中数据
        this.props.addCategoryAsync(values.categoryName)
          .then(() => {
            //成功添加商品后
            // 隐藏对话框
            message.success(`添加商品分类${values.categoryName}成功!`)
            this.hidden("addCategory")();
          })
      }
    })
  }
  // 点击确认修改分类
  updateCategory = () => {
    this.updateCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values
        const categoryId = this.state.category._id
        // 校验成功后，发送请求修改redux数据和后台数据
        await this.props.updateCategoryAsync(categoryId, categoryName)
        message.success(`修改分类名称${categoryName}成功!`)
        this.hidden("updateCategory")();
      }
    })
  }
  // 点击cancel 
  hidden = (name) => {
    // 隐藏对话框
    return () => {
      this.setState({
        [name + "Visible"]: false
      });
      // 重置表单内容(等对话隐藏的动画结束后清空)
      setTimeout(() => {
        this[name + "Form"].props.form.resetFields()
      }, 500)
    }
  }
  render() {
    const { categories } = this.props;
    const { addCategoryVisible, updateCategoryVisible, category } = this.state
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showAddCategory} >
              <Icon type="plus" />分类列表
            </Button>
          }
        >
          {/* 分类列表 */}
          <Table
            columns={this.columns}
            dataSource={categories}
            bordered
            rowKey="name" //默认找key属性
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9", "12"],
              defaultPageSize: 3
            }}
          />
        </Card>
        {/* 添加分类对话框 */}
        <Modal
          title="添加分类"
          visible={addCategoryVisible}
          width={300}
          onOk={this.addCategory}
          onCancel={this.hidden("addCategory")}
          okText="确认"
          cancelText="取消"
        >
          {/* fun-ref用法： 将组件实例对象通过参数form传递进去，箭头函数通过this.AddCategoryForm获取实例对象,this指当前组件*/}
          <AddCategoryForm wrappedComponentRef={(form) => this.addCategoryForm = form} />
        </Modal>

        {/* 修改分类对话框 */}
        <Modal
          title="修改分类"
          visible={updateCategoryVisible}
          width={300}
          onOk={this.updateCategory}
          onCancel={this.hidden("updateCategory")}
          okText="确认"
          cancelText="取消"
        >
          <UpdateCategoryForm
            categoryName={category.name}
            wrappedComponentRef={(form) => this.updateCategoryForm = form} />
        </Modal>
      </div>
    )
  }
}

export default Category
