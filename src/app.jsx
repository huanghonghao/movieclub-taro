import Taro, { Component } from '@tarojs/taro'
import Index from './pages/home'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/home/index',
      'pages/user/index',
      'pages/detail/index',
      'pages/search/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '小电影',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#808080',
      selectedColor: '#000000',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: 'images/playon.png',
          selectedIconPath: 'images/playon_fill.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: 'images/mine.png',
          selectedIconPath: 'images/mine_fill.png'
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
