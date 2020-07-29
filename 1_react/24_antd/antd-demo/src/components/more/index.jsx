import React, { PureComponent } from "react";

class Index extends PureComponent {
  state = {
    showMore: false,
  };
  render() {
    return (
      <div className="wrap">
        <div>
          视频自制。2010-2019Billboard十年总榜回顾：火星哥联手马克荣森合作单《Uptown
          Funk!》毫无悬念称霸冠军，billboard17冠神曲《Old Town
          Road》火速闯进前50，《Sunflower》靠着顽强后劲继续攀升，最终有望排在11-15名，《Sucker》《Bad
          Guy》即将闯进十年榜。视频数据截止2019年8月3日，官方最终排名会有出入，但整体变化不大。歌曲走势查询网址：http://x.musictrack.cn/
        </div>
        <span>showMore</span>
      </div>
    );
  }
}
