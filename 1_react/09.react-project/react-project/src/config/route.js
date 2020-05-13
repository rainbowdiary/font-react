/* import Home from "../components/home";
import Login from "../containers/login";
import Notfind from "../components/notfind";
import Category from '../containers/category';
import Product from '../components/product';
import ProductDetail from '../components/product/product-detail';
import ProductForm from '../components/product/product-form';
import Role from '../containers/role';
import User from '../containers/user';
import ChartsBar from '../components/chars/bar';
import ChartsLine from '../components/chars/line';
import ChartsPie from '../components/chars/pie';

//  对路由组件进行懒加载和代码分割 */
import Loadable from "react-loadable";
import { Spin } from "antd"
const Home = Loadable({
  loader: () => import("../components/home"),
  loading: Spin
})
const Login = Loadable({
  loader: () => import("../containers/login"),
  loading: Spin
})
const Notfind = Loadable({
  loader: () => import("../components/notfind"),
  loading: Spin
})
const Category = Loadable({
  loader: () => import("../containers/category"),
  loading: Spin
})
const Product = Loadable({
  loader: () => import("../components/product"),
  loading: Spin
})
const ProductDetail = Loadable({
  loader: () => import("../components/product/product-detail"),
  loading: Spin
})
const ProductForm = Loadable({
  loader: () => import("../components/product/product-form"),
  loading: Spin
})
const Role = Loadable({
  loader: () => import("../containers/role"),
  loading: Spin
})
const User = Loadable({
  loader: () => import("../containers/user"),
  loading: Spin
})
const ChartsBar = Loadable({
  loader: () => import("../components/chars/bar"),
  loading: Spin
})
const ChartsLine = Loadable({
  loader: () => import("../components/chars/line"),
  loading: Spin
})
const ChartsPie = Loadable({
  loader: () => import("../components/chars/pie"),
  loading: Spin
})



//  对路由组件进行区分,需要验证的路由,和不需要验证的路由

//  需要验证
const authRoutes = [{
  path: "/",
  component: Home,
  exact: true
},
{
  path: "/category",
  component: Category,
  exact: true
},
{
  path: "/product",
  component: Product,
  exact: true
},
{
  path: "/product/add",
  component: ProductForm,
  exact: true
},
{
  path: "/product/:id",
  component: ProductDetail,
  exact: true
},
{
  path: "/product/update/:id",
  component: ProductForm,
  exact: true
},
{
  path: "/role",
  component: Role,
  exact: true
},
{
  path: "/user",
  component: User,
  exact: true
},
{
  path: "/charts/line",
  component: ChartsLine,
  exact: true
},
{
  path: "/charts/bar",
  component: ChartsBar,
  exact: true
},
{
  path: "/charts/pie",
  component: ChartsPie,
  exact: true
},
{
  component: Notfind
} //没有写path,默认匹配所有
]

//  不需要验证的路由
const noAuthRoutes = [{
  path: "/login",
  component: Login,
  exact: true
}];

export {
  authRoutes,
  noAuthRoutes
}