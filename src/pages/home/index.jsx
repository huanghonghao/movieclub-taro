import Taro, {PureComponent} from '@tarojs/taro'
import chunk from 'lodash/chunk';
import { stringify } from 'qs';
import NavBar from 'taro-navigationbar';
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import {AtActivityIndicator, AtTabs} from 'taro-ui';
import {ClCard, ClText} from 'mp-colorui';
import TabsContent from '../../components/TabsContent';
import './index.scss'
import {movies} from '../../service/api';

const defaultStatus = {
  data: [],
  offset: 0,
  limit: 21,
  loading: true,
  error: false,
  triggered: false,
  bottomLoading: false,
};

export default class Index extends PureComponent {
  state = {
    current: 0,
    all: defaultStatus
  };

  componentWillMount() {
  }

  componentDidMount() {
    this.reload();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  config = {
    navigationBarTitleText: '',
    navigationStyle: 'custom',
    disableScroll: true,
  };

  reload = () => {
    const { all } = this.state;
    movies({offset: 0, limit: 21}).then(data => {
      this.setState({ all: { ...all, data, loading: false } })
    }).catch(() => {
      this.setState({ all: { ...all, error: true } })
    })
  };

  handleClick = current => {
    this.setState({current});
  };

  handleOnChange = e => {
    const { detail: { source, current } } = e;
    if(source === 'touch') {
      this.setState({current});
    }
  };

  onAnimationFinish = e => {
    const { detail: { current } } = e;
    switch (current) {
      case 0:
        this.reload();
        break;
      case 1:
        // TODO
        this.setState({all: defaultStatus});
        break;
      case 2:
        this.setState({all: defaultStatus});
        break;
      case 3:
        this.setState({all: defaultStatus});
        break;
      case 4:
        this.setState({all: defaultStatus});
        break;
    }
  };

  // eslint-disable-next-line no-shadow
  renderCard = movies => {
    return chunk(movies, 3).map((row, index) => (
      <View key={index} className='at-row'>
        {row.map(col => (
          <View
            key={col.id}
            className='at-col at-col-4'
            onClick={() => Taro.navigateTo({url: `/pages/detail/index?${stringify({id: col.id})}`})}
          >
            <ClCard
              active
              renderTitle={
                <View style='position: relative;'>
                  <Image
                    src={col.cover}
                    lazyLoad
                  />
                  <View className='movie-card-footer'>
                    <Text>{col.doubanScore || '无评'}分</Text>
                  </View>
                </View>
              }
            >
              <View className='movie-name'>
                <ClText cut align='left'>{col.title}</ClText>
              </View>
            </ClCard>
          </View>
        ))}
      </View>
    ))
  };

  onRefresherRefresh = () => {
    const { all } = this.state;
    this.setState({ all: { ...all, triggered: true } });
    const offset = all.limit;
    const limit = all.offset + all.limit;
    movies({ offset, limit }).then(data => {
      this.setState({ all: { ...all, data: [...all.data, ...data], loading: false, triggered: false, offset, limit } })
    }).catch(e => {
      console.error(e);
      this.setState({ all: { ...all, loading: false, triggered: false } })
    });
  };

  onScrollToLower = () => {
    const { all } = this.state;
    if(!all.bottomLoading) {
      console.log('下拉加载中...');
      this.setState({ all: { ...all, bottomLoading: true } });
      const limit = all.limit;
      const offset = all.offset + all.limit;
      movies({ offset, limit }).then(data => {
        console.log('下拉加载完成');
        this.setState({ all: { ...all, data: [...all.data, ...data], loading: false, bottomLoading: false, offset, limit } })
      }).catch(e => {
        console.error(e);
        this.setState({ all: { ...all, bottomLoading: false } })
      });
    }
  };

  render() {
    // eslint-disable-next-line no-shadow
    const {
      current,
      all
    } = this.state;
    const errorContent =
      <View className='at-activity-indicator at-activity-indicator--center'>
        <Text className='at-activity-indicator__content'>😭臣妾做不到</Text>
      </View>;
    const loadingContent = <AtActivityIndicator mode='center' content='😫臣妾正在努力加载...' />;
    return (
      <View className='movie-main'>
        <NavBar
          searchBar
          searchText='电影太多？试试搜索'
          onSearch={() => {
            Taro.navigateTo({url: '/pages/search/index'})
          }}
          // renderLeft={
          //   <ClSearchBar
          //     shape='round'
          //     bgColor='white'
          //     searchType='none'
          //     placeholder='电影太多？搜索一下吧'
          //     className='movie-searchBar'
          //     onFocus={() => {
          //       Taro.navigateTo({url: '/pages/search/index'})
          //     }}
          //   />
          // }
        />
        <AtTabs
          current={current}
          scroll
          swipeable={false}
          tabList={[
            {title: '全部'},
            {title: '电影'},
            {title: '电视剧'},
            {title: '综艺'},
            {title: '动画'},
          ]}
          onClick={this.handleClick}
        >
          {/*<AtTabsPane current={this.state.current} index={0}>
          <TabsContent>
            <View >全部11</View>
          </TabsContent>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <TabsContent>
            <View >电影</View>
          </TabsContent>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <TabsContent>
            电视剧
          </TabsContent>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3}>
          <TabsContent>
            综艺
          </TabsContent>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={4}>
          <TabsContent>
            动画
          </TabsContent>
        </AtTabsPane>*/}
        </AtTabs>
        <Swiper
          duration={300}
          skipHiddenItemLayout
          className='movie-swiper'
          current={current}
          onChange={this.handleOnChange}
          onAnimationFinish={this.onAnimationFinish}
        >
          <SwiperItem>
            <TabsContent
              refresherTriggered={all.triggered}
              // onRefresherRefresh={this.onRefresherRefresh}
              refresherEnabled={false}
              onScrollToLower={this.onScrollToLower}
            >
              {all.loading ?
                (all.error ? errorContent : loadingContent) :
                this.renderCard(all.data)}
              {!all.loading ? (
                <View className='bottom-loading bottom-loading--center'>
                  <AtActivityIndicator mode='center' content='😫臣妾正在努力加载...' />
                </View>
              ) : null}
            </TabsContent>
          </SwiperItem>
          <SwiperItem>
            <TabsContent>
              {this.renderCard([])}
            </TabsContent>
          </SwiperItem>
          <SwiperItem>
            <TabsContent>
              {this.renderCard([])}
            </TabsContent>
          </SwiperItem>
          <SwiperItem>
            <TabsContent>
              {this.renderCard([])}
            </TabsContent>
          </SwiperItem>
          <SwiperItem>
            <TabsContent>
              {this.renderCard([])}
            </TabsContent>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
