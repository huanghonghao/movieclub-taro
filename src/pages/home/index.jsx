import Taro, {Component} from '@tarojs/taro'
import chunk from 'lodash/chunk';
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import {AtActivityIndicator, AtTabs} from 'taro-ui';
import {ClCard, ClText} from "mp-colorui";
import TabsContent from '../../components/TabsContent';
import './index.scss'
import {movies} from "../../service/api";

export default class Index extends Component {
  state = {
    current: 0,
    movies: [],
    allLoading: true,
    allError: false,
  };

  componentWillMount() {
  }

  componentDidMount() {
    movies().then(data => {
      this.setState({ movies: data, allLoading: false })
    }).catch(() => {
      this.setState({ allError: true })
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  config = {
    navigationBarTitleText: '首页',
    disableScroll: true,
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

  // eslint-disable-next-line no-shadow
  renderCard = movies => {
    return chunk(movies, 3).map((row, index) => (
      <View key={index} className='at-row'>
        {row.map(col => (
          <View key={col.id} className='at-col at-col-4'>
            <ClCard
              active
              renderTitle={
                <Image
                  src={col.cover}
                  lazyLoad
                />
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

  render() {
    // eslint-disable-next-line no-shadow
    const { current, movies, allLoading, allError } = this.state;
    const errorContent =
      <View className='at-activity-indicator at-activity-indicator--center'>
        <Text className='at-activity-indicator__content'>😭臣妾做不到</Text>
      </View>;
    const loadingContent = <AtActivityIndicator mode='center' content='😫臣妾正在努力加载...' />;
    return (
      <View>
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
          className='movie-swiper'
          current={current}
          onChange={this.handleOnChange}
        >
          <SwiperItem>
            <TabsContent>
              {allLoading ?
                (allError ? errorContent : loadingContent) :
                this.renderCard(movies)}
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
