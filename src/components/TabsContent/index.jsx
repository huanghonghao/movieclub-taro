import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';

const scrollTop = 0;
const Index = ({ children, refresherEnabled = true, refresherTriggered, onRefresherRefresh, onScrollToLower }) => (
  <ScrollView
    className='scrollview'
    scrollY
    scrollWithAnimation
    enableBackToTop
    scrollTop={scrollTop}
    // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
    // onScroll={this.onScroll}
    refresherEnabled={refresherEnabled}
    refresherTriggered={refresherTriggered}
    onRefresherRefresh={onRefresherRefresh}
    onScrollToLower={onScrollToLower}
    // lowerThreshold={150}
  >
    {children}
  </ScrollView>
);

export default Index;
