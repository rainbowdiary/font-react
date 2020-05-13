# 错误边界
**是什么?** 
  react中自己定义的组件，返回自己包裹的组件或内容
**作用?**
  生成环境，如果项目出错导致整个页面白屏，无法访问，使用错误边界组件，
  包裹可能出错的组件，一旦出错其他没有出错的组件照常显示，出错的组件
  通过ErrorBoundary组件给用户友好提示，还能将错误发送给后台统计
  将错误的影响减少到最小的范围
**使用**
  1. 自己定义ErrorBoundary错误边界组件为高阶组件函数
     1. 两个专门处理错误边界的生命周期函数（当渲染过程，生命周期，或子组件的构造函数抛出错误）
        1. **static getDerivedStateFromError(error)**
        2. **componentDidCatch(info, error)**
     2. 返回错误边界组件包裹的内容
  2. 包裹可能出错的组件
     1.  包裹有功能的路由组件，调用高阶组件函数，包裹路由组件
  3. 只能运用在生产环境



# 封装成组件
```
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  /*
    这两个都是生命周期函数：一般不触发
    一旦后代组件生命周期函数中出错，才触发

    只能在生产环境生效
  */
  static getDerivedStateFromError(error) {
    // 返回一个新状态
    return {
      hasError: true
    };
  }

  componentDidCatch(info, error) {
    // 收集错误信息，发送到后台去
    console.log(info, error);
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <div>哇哦，页面崩溃了，请联系管理员~</div>;
    }

    return this.props.children;
  }
}

```

使用:
```
import ErrorBoundary from "./ErrorBoundary.jsx"
export default App extendes Component {
  render(){
    return (<Fragement><ErrorBoundary><Category/></ErrorBoundary></Fragment>)
  }
}
```

## 封装成高阶组件
**注意**:一定要把this.props传递下去
```
import React, { Component } from "react";

export default function withErrorBoundary(WrappedComponent) {
  return class extends Component {
    static displayName = `ErrorBoundary(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      "Component"})`;

    state = {
      hasError: false
    };
    /*
      这两个都是生命周期函数：一般不触发
      一旦后代组件生命周期函数中出错，才触发
  
      只能在生产环境生效
    */
    static getDerivedStateFromError(error) {
      // 返回一个新状态
      return {
        hasError: true
      };
    }

    componentDidCatch(info, error) {
      // 收集错误信息，发送到后台去
      console.log(info, error);
    }

    render() {
      const { hasError } = this.state;

      if (hasError) {
        return <div>哇哦，页面崩溃了，请联系管理员~</div>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

```
其他组件使用
```
import ErrorBoundary from "./ErrorBoundary.jsx"
@withErrorBoundary
```