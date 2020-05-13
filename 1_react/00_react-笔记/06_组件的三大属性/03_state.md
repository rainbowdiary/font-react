##  state属性:更新页面状态

    初始化: constructor(){}
    读取: this.state
    设置: this.setState({对象})

  render
  constructor只会运行一次, 修改this指向
  bind返回一个新函数, 不会改变原函数

setState使用方式：
  this.setState({x:x}) 
  this.setState(() => {})  保障多次调用会被更新, 更新的结果累加
  this.setState({xxx}, () => {})  后面回调函数更新流程全部完毕后才触发（componentDidUpdate）

# setState({})是同步还是异步的?
  既是同步也是异步, 看情况
  1). 生命周期函数、React合成事件函数中: 异步更新: 
       - 多次setState会合并成一次(最后一次生效)
       - 异步代码会等同步代码执行完再执行
  3). 定时器、原生DOM事件: setState是同步的
  避免多次调用setState

# setState
```案例1
class App extends Component {
  handleChange = e => {
    this.setState({
      value: +e.target.value
    })
    console.log('setState之后', this.state.value); //获取的是上一次的值，更新之前的值，因为setState在合成事件中是异步更新的，这句代码console.log会被先执行，拿到的还是之前的值
  }

    handleIncrement = () => {
    console.log(this.state.value);             //获取的是更新后的值
  }
  render() {
    return (
      <div>
        <div className='times'>click 0 times</div>
        <select onChange={this.handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}
```


面试问:

state={num:1}
this.setState({
  num: num+1
});
console.log(this.state.num) //输出多少? 

反问面试官： 是在哪里调用的setState()? 
  如果是在componentDidMount的生命周期函数和react合成事件中中调用，则输出1；更新之前的状态数据；
  在普通的DOM事件或者定时器中调用则输出2