export default [{
  icon: "home",
  title: "home",
  path: "/"
},
{
  icon: "appstore",
  title: "products",
  path: "/products",
  children: [{
    icon: "bars",
    title: "category",
    path: "/category"
  },
  {
    icon: "tool",
    title: "product",
    path: "/product"
  },
  ]
},
{
  icon: "user",
  title: "user",
  path: "/user"
},
{
  icon: "safety",
  title: "role",
  path: "/role"
},
{
  icon: "area-chart",
  title: "charts",
  path: "/charts",
  children: [
    {
      icon: "line-chart",
      title: "line",
      path: "/charts/line"
    },
    {
      icon: "bar-chart",
      title: "bar",
      path: "/charts/bar"
    },
    {
      icon: "pie-chart",
      title: "pie",
      path: "/charts/pie"
    },
  ]
}
]