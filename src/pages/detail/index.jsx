import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import {parse} from 'qs';
import { AtTag } from 'taro-ui'
import { ClCard, ClText, ClAccordion, ClLayout } from 'mp-colorui';
import {detail} from "../../service/api";
import './index.scss'

export default class User extends PureComponent {
  state = {
    movie: {}
  };

  componentWillMount () {
    Taro.showLoading({
      title: '加载中'
    });
    this.$preloadData
      .then(movie => {
        this.setState({movie});
        Taro.hideLoading();
      })
  }

  componentWillPreload (params) {
    return detail(params.id)
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '影片详情'
  };

  render () {
    const { movie } = this.state;
    return (
      <View>
        <ClCard type='full'>
          <View className='at-row'>
            <View className='at-col at-col-4'>
              <Image mode='aspectFill' src={movie.cover} className='movie-img' />
            </View>
            <View className='at-col at-col-8 movie-description'>
              <View className='at-row at-row--wrap'>
                <View className='at-col at-col-12 at-col--wrap'>
                  <ClText align='left' fontWeight='bold' size='xlarge' text={movie.title || ''} />
                  {/*<View className='movie-title'>
                    <Text>{movie.title || ''}</Text>
                  </View>*/}
                </View>
                {movie.director && (
                  <View className='at-col at-col-12 at-col--wrap'>
                    <Text>导演: {movie.director}</Text>
                  </View>
                )}
                <View className='at-col at-col-12 at-col--wrap'>
                  <Text>类型: {movie.type || ''}</Text>
                </View>
                <View className='at-col at-col-12 at-col--wrap'>
                  <Text>发布时间: {movie.releaseTime || ''}</Text>
                </View>
                <View className='at-col at-col-6 at-col--wrap'>
                  <Text>国家: {movie.country || ''}</Text>
                </View>
                {movie.language && (
                  <View className='at-col at-col-6 at-col--wrap'>
                    <Text>语言: {movie.language}</Text>
                  </View>
                )}
                <View className='at-col at-col-6 at-col--wrap'>
                  <Text>豆瓣评分: {movie.doubanScore || ''}</Text>
                </View>
              </View>
            </View>
          </View>
        </ClCard>
        <ClLayout margin='normal' marginDirection='vertical'>
          <ClAccordion title='简介' className='movie-introduction'>
            <ClLayout padding='normal' paddingDirection='around'>
              <ClText text={movie.introduction || ''} />
            </ClLayout>
          </ClAccordion>
        </ClLayout>
        <ClLayout margin='normal' marginDirection='vertical' className='movie-link'>
          <ClCard
            type='full'
            renderTitle={
              <View className='cu_card__title-line padding'>
                <Text>下载</Text><ClText lineSpacing={45} text='(点击复制连接到迅雷下载)' size='small' textColor='grey' />
              </View>
            }
          >
            {movie.downloadLinks &&
            JSON.parse(movie.downloadLinks).map((item, index) => {
              let definition;
              if(item.startsWith('ed2k')) {
                const filename = item.split('|')[2];
                let regExp = new RegExp("\\.(BD|bd|HD|hd|TS|ts|DVD|dvd|TC|tc)[\\w\\W]+", 'g');
                const group = regExp.exec(filename);
                definition = group && group[0].substring(1) || filename;
              } else if(item.startsWith('ftp')) {
                const filename = item.substring(item.lastIndexOf('/') + 1);
                let regExp = new RegExp("(BD|bd|HD|hd|TS|ts|DVD|dvd|TC|tc)[\\w\\W]+", 'g');
                const group = regExp.exec(filename);
                definition = group && group[0] || filename;
              } else if(item.startsWith('magnet')) {
                const filename = parse(item).dn;
                let regExp = new RegExp("\\.(BD|bd|HD|hd|TS|ts|DVD|dvd|TC|tc)[\\w\\W]+", 'g');
                const group = regExp.exec(filename);
                definition = group && group[0].substring(1) || '未知，先复制看看吧';
              } else {
                let regExp = new RegExp("(BD|bd|HD|hd|TS|ts|DVD|dvd|TC|tc)\\d+P", 'g');
                const group = regExp.exec(item);
                definition = group && group[0] || item;
              }

              return (
                <View key={index} className='subitem'>
                  <AtTag
                    active
                    onClick={() => {
                      Taro.setClipboardData({
                        data: item,
                        success: function () {
                          Taro.showToast({
                            title: '复制成功',
                            icon: 'success',
                            duration: 2000
                          })
                        }
                      })
                    }}
                  >
                    {definition}
                  </AtTag>
                </View>
              );
            })}
          </ClCard>
        </ClLayout>
      </View>
    )
  }
}
