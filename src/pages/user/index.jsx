import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtTabBar } from 'taro-ui'
import { ClCard, ClText } from "mp-colorui";
import './index.scss'

export default class User extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '我的'
  };

  render () {
    return (
      <ClCard>
        <View className='index'>
          该小程序只用于学习和开发，一切版权归Jason Wong所有
        </View>
      </ClCard>
    )
  }
}
