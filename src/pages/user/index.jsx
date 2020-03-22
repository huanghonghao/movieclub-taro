import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ClCard, ClFlex, ClLayout, ClMenuList, ClAvatar } from 'mp-colorui';
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

  clickMenu = index => {
    switch (index) {
      case 0: {
        Taro.navigateTo({
          url: "/pages/update/index"
        });
        break;
      }
      case 1: {
        Taro.previewImage({
          urls: [
            "cloud://movieclub-2q3n4.6d6f-movieclub-2q3n4-1301638200/zhanshangma.jpg"
          ],
        });
        break;
      }
      default: {
      }
    }
  };

  render () {
    return (
      <View>
        <ClCard type='full'>
          <ClFlex justify='around' align='center'>
            <View>
              <ClAvatar
                shape='round'
                size='xlarge'
                headerArray={[
                  {
                    icon: 'like'
                  }
                ]}
              />
            </View>
            <View>天若有情忘不了的话，请作者喝杯茶吧</View>
          </ClFlex>
        </ClCard>
        <ClLayout padding='normal' paddingDirection='vertical'>
          <ClMenuList
            shortBorder
            onClick={this.clickMenu}
            list={[
              // {
              //   icon: {
              //     iconName: 'form',
              //     size: 'small',
              //     color: 'grey'
              //   },
              //   title: '文档地址',
              //   arrow: true
              // },
              // {
              //   icon: {
              //     iconName: 'github',
              //     size: 'small'
              //   },
              //   title: 'Github',
              //   arrow: true
              // },
              {
                icon: {
                  iconName: 'creativefill',
                  size: 'small',
                  color: 'olive'
                },
                title: '更新日志',
                arrow: true
              },
              // {
              //   icon: {
              //     iconName: 'message',
              //     size: 'small',
              //     color: 'blue'
              //   },
              //   title: '留言',
              //   arrow: true
              // },
              {
                icon: {
                  iconName: 'appreciatefill',
                  size: 'small',
                  color: 'red'
                },
                title: '赞赏',
                arrow: true
              }
            ]}
          />
        </ClLayout>
      </View>
    )
  }
}
