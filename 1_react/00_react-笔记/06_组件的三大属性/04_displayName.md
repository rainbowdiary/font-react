## displayName
用于封装高阶函数时包装显示名称以便轻松调试
```
export default function withHoc(name) {
  return function(WrappedComponent) {
    return class extends Component {
      // 给组件取名称(优先级更高)
      static displayName = `Form(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;

      state = {
        username: "",
        password: "",
        rePassword: ""
      };

      handleChange = key => {
        return e => {
          this.setState({
            [key]: e.target.value.trim()
          });
        };
      };

      handleSubmit = e => {
        e.preventDefault();
        const { username, password, rePassword } = this.state;

        let content = `用户名: ${username}  密码: ${password}`;
        if (name === "register") {
          content += `  确认密码: ${rePassword}`;
        }
        alert(content);
      };

      render() {
        return (
          <WrappedComponent
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            {...this.state}
          />
        );
      }
    };
  };
}
