import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { stringify } from 'qs';
import {AtList, AtListItem, AtActivityIndicator} from 'taro-ui'
import { ClSearchBar } from 'mp-colorui';
import {search} from "../../service/api";
import './index.scss'

export default class User extends PureComponent {
  state = {
    data: [],
    loading: false,
    error: false
  };

  componentWillMount () {
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '搜索'
  };

  content(text) {
    return (
      <View className='at-activity-indicator at-activity-indicator--center'>
        <Text className='at-activity-indicator__content'>{text}</Text>
      </View>
    )
  };

  render () {
    const {data,loading,error} = this.state;
    const loadingContent = <AtActivityIndicator mode='center' content='😫臣妾正在努力加载...' />;
    return (
      <View>
        <ClSearchBar
          shape='round'
          bgColor='white'
          fix
          clear
          searchType='none'
          placeholder='搜索你想要的'
          onSearch={v => {
            this.setState({loading: true});
            search(v).then(list => {
              this.setState({data: list, loading: false})
            }).catch(() => {
              this.setState({error: true})
            })
          }}
        />
        <View className='movie-search-result'>
          {loading ?
            (error ? this.content('服务器似乎抽风了！') : loadingContent) :
            (data.length === 0 ? this.content('空空如也') :
              <AtList>
                {data.map(item => (
                  <AtListItem
                    key={item.id}
                    title={item.title}
                    note='HD'
                    extraText={`${item.doubanScore || 10}分`}
                    onClick={() => Taro.navigateTo({url: `/pages/detail/index?${stringify({id: item.id})}`})}
                  />
                ))}
              </AtList>
            )}
        </View>
      </View>
    )
  }
}
