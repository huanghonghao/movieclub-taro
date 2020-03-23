import Taro, { pxTransform, PureComponent } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import { ClCard, ClLayout } from 'mp-colorui';
import {episodes as getEpisodes} from "../../service/api";
// import './index.scss'

export default class User extends PureComponent {
  state = {
    episodes: [],
    playUrl: undefined
  };

  componentWillMount () {
    Taro.showLoading({
      title: '加载中'
    });
    this.$preloadData
      .then(data => {
        this.setState({episodes: data});
        Taro.hideLoading();
      })
  }

  componentWillPreload (params) {
    return getEpisodes(params.movieId)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '在线播放'
  };

  render () {
    const { episodes, playUrl } = this.state;
    return (
      <View>
        <Video
          style={{width: '100%'}}
          src={playUrl}
          autoplay
          enablePlayGesture
        />
        <ClLayout margin='normal' marginDirection='vertical'>
          <ClCard
            type='full'
            title='剧集'
          >
            <View className='at-row at-row--wrap'>
              {episodes.map(item => (
                <View key={item.id} className='at-col at-col-3 at-col--wrap' style={{marginBottom: pxTransform(20)}}>
                  <AtTag
                    name={item.id}
                    type='primary'
                    active={item.active || false}
                    onClick={() => {
                      const newEpisodes = episodes.map(v => v.id === item.id ? {...v, active: true} : {...v, active: false});
                      this.setState({playUrl: item.playLink, episodes: newEpisodes})
                    }}
                  >
                    第{item.name}集
                  </AtTag>
                </View>
              ))}
            </View>
          </ClCard>
        </ClLayout>
      </View>
    )
  }
}
