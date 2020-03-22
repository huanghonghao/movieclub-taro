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
    all: {...defaultStatus},
    tvb: {...defaultStatus}
  };

  componentWillMount() {
  }

  componentDidMount() {
    this.reload(0);
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

  reload = kind => {
    switch (kind) {
      case 0:
        const { all } = this.state;
        movies({offset: 0, limit: 21, kind}).then(data => {
          this.setState({ all: { ...all, data, loading: false } })
        }).catch(() => {
          this.setState({ all: { ...all, error: true } })
        });
        break;
      case 4:
        const { tvb } = this.state;
        movies({offset: 0, limit: 21, kind}).then(data => {
          this.setState({ tvb: { ...tvb, data, loading: false } })
        }).catch(() => {
          this.setState({ tvb: { ...tvb, error: true } })
        });
        break;
    }
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
        this.setState({tvb: {...defaultStatus}});
        this.reload(0);
        break;
      case 1:
        this.setState({all: {...defaultStatus}});
        this.reload(4);
        break;
      case 2:
        this.setState({all: {...defaultStatus}, tvb: {...defaultStatus}});
        break;
      case 3:
        this.setState({all: {...defaultStatus}, tvb: {...defaultStatus}});
        break;
      case 4:
        this.setState({all: {...defaultStatus}, tvb: {...defaultStatus}});
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
                    <Text>{col.kind === 4 ? col.updateSituation || '无更新' : `${col.doubanScore}分` || '无评分'}</Text>
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

  onScrollToLower = kind => {
    switch (kind) {
      case 0:
        const { all } = this.state;
        if(!all.bottomLoading) {
          this.setState({ all: { ...all, bottomLoading: true } });
          const limit = all.limit;
          const offset = all.offset + all.limit;
          movies({ offset, limit, kind }).then(data => {
            this.setState({ all: { ...all, data: [...all.data, ...data], loading: false, bottomLoading: false, offset, limit } })
          }).catch(e => {
            console.error(e);
            this.setState({ all: { ...all, bottomLoading: false } })
          });
        }
        break;
      case 4:
        const { tvb } = this.state;
        if(!tvb.bottomLoading) {
          this.setState({ tvb: { ...tvb, bottomLoading: true } });
          const limit = tvb.limit;
          const offset = tvb.offset + tvb.limit;
          movies({ offset, limit, kind }).then(data => {
            this.setState({ tvb: { ...tvb, data: [...tvb.data, ...data], loading: false, bottomLoading: false, offset, limit } })
          }).catch(e => {
            console.error(e);
            this.setState({ tvb: { ...tvb, bottomLoading: false } })
          });
        }
        break;
    }
  };

  render() {
    // eslint-disable-next-line no-shadow
    const {
      current,
      all,
      tvb
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
        />
        <AtTabs
          current={current}
          scroll
          swipeable={false}
          tabList={[
            // {title: '全部'},
            {title: '电影'},
            {title: 'TVB'},
            {title: '电视剧'},
            {title: '综艺'},
            {title: '动画'},
          ]}
          onClick={this.handleClick}
        >
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
              onScrollToLower={() => this.onScrollToLower(0)}
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
            <TabsContent
              refresherTriggered={tvb.triggered}
              // onRefresherRefresh={this.onRefresherRefresh}
              refresherEnabled={false}
              onScrollToLower={() => this.onScrollToLower(4)}
            >
              {tvb.loading ?
                (tvb.error ? errorContent : loadingContent) :
                this.renderCard(tvb.data)}
              {!tvb.loading ? (
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
        </Swiper>
      </View>
    )
  }
}
