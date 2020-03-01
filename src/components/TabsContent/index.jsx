import Taro from '@tarojs/taro';
import { View, Text, ScrollView } from '@tarojs/components';

const scrollTop = 0;
const scrollStyle = {
  height: '100%',
  // position: 'relative'
};
const Threshold = 20;

const Index = ({ children }) => (
  <ScrollView
    className='scrollview'
    scrollY
    scrollWithAnimation
    enableBackToTop
    scrollTop={scrollTop}
    style={scrollStyle}
    lowerThreshold={Threshold}
    upperThreshold={Threshold}
    // onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
    // onScroll={this.onScroll}
  >
    {children}
  </ScrollView>
);

export default Index;
