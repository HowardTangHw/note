class Main {
    constructor() { }
    swiper() {
        window.sw1 = new Swiper('.sw1', {
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            direction: 'horizontal',
            onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            },
            onSlideChangeEnd: function (swiper) {
                //     // my_swiper.lockSwipeToNext();
                // // my_swiper.unlockSwipeToNext();
                // my_swiper.activeIndex >= 3 ? $('.g-arow').hide() : $('.g-arow').show();
                $('.area3 .btn-list a').removeClass('current').eq(sw1.activeIndex).addClass('current');
            },
            onTouchEnd: function (swiper) {
                $('.area3 .btn-list a').removeClass('current').eq(sw1.activeIndex).addClass('current');
            }
        });
        window.sw2 = new Swiper('.sw2', {
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            direction: 'horizontal',
            onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            },
            onSlideChangeEnd: function (swiper) {
                //     // my_swiper.lockSwipeToNext();
                // // my_swiper.unlockSwipeToNext();
                // my_swiper.activeIndex >= 3 ? $('.g-arow').hide() : $('.g-arow').show();
                $('.area4 .btn-list a').removeClass('current').eq(sw2.activeIndex).addClass('current');
            },
            onTouchEnd: function (swiper) {
                $('.area4 .btn-list a').removeClass('current').eq(sw2.activeIndex).addClass('current');
            }
        });
    }
    wx() {
        /*分享到微信*/
        wxApi.init(function () {
            var shareData = {
                title: '春游吸睛指南 谁GET谁先美', // 分享标题
                desc: '春天最适合外出郊游啦~~除了穿得美美的，春游美妆也要重视哦。', // 分享描述
                link: window.location.href, // 分享链接
                imgUrl: document.getElementsByName('sharepic')[0].content, // 分享图标
            }
            wx.onMenuShareAppMessage(shareData);// 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline(shareData);// 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareQQ(shareData);// 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo(shareData);// 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
        });
    }
    vote() {
        var playID = 'pconline_zt20170315diannaocheng';
        // var playID = 'pconline_zt20161116diannaocheng';
        function initVote() {
            $('.vote-pie').each(function (inx, el) {
                // 把投票项加入页面
                var $this = $(this);
                var voteIDs = [];
                var voteGroupID = inx;
                var voteItems = '';
                eval('var opt='+$this.find('script').html());
                eval('var radius='+$this.attr('data-radius'));
                $.each(opt, function (index, item) {
                    var voteID = playID + '_' + voteGroupID + '_' + index;
                    voteIDs.push(voteID);
                    voteItems += '<span id="' + voteID + '_positive" class="hidden"></span>';
                });
                $this.append(voteItems);
                // 取得投票项数据，创建图表
                getDelayResult(voteIDs.join(','), 1);

                setTimeout(function () {

                    var pData = [];
                    $.each(voteIDs, function (index, item) {
                        var val = parseInt($('#' + item + '_positive').text());
                        pData[index] = {
                            value: val == 0 ? 1 : val,
                            name: opt[index]
                        }
                    });
                    var chart = $this.find('.chart')[0];
                    chart.init = function (id, num) {
                        console.log(num)
                        // num是投票数目，如果是不可投的，会返回-1
                        if (num == -1) {
                            alert('请在规定的时间内投票！');
                        } else {

                            createPie(chart, radius, pData, function (selectIndex) {

                                var voteID = playID + '_' + voteGroupID + '_' + selectIndex;
                                pData[selectIndex].value += 1;
                                positive_delay_vote(voteID, "$('.vote-pie').eq(" + inx + ").find('.chart')[0].init");
                            });
                        }
                    }
                    chart.init();
                }, 2000);
            })
        }
        function createPie(chart, radius, data, pieselect) {
            echarts.registerTheme('theme', { "color": ["#95c3f8", "#9fccff", "#5796dd", "#2775cd", "#64acff"] });
            if (chart.pie) chart.pie = null;
            chart.pie = echarts.init(chart, 'theme');
            var option = {
                animation: navigator.userAgent.indexOf('MSIE') >= 0 ? false : true,
                series: [
                    {
                        type: 'pie',
                        center: ["50%", "50%"],
                        startAngle: 126,
                        radius: ["0", "50%"],
                        data: data,
                        label: {
                            normal: {
                                formatter: function (data) {
                                    if (data.percent < 10 && data.name.length < 5) {
                                        return data.name.replace(new RegExp(/(\n)/g), '') + '  ' + data.percent + '%';
                                    } else {
                                        return data.percent + '%\n' + data.name;
                                    }
                                },
                                textStyle: {
                                    color: '#3f3e48',
                                    fontSize: '.1rem',
                                    fontFamily: 'simhei'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 22,
                                lineStyle: {
                                    color: '#393458'
                                }
                            }
                        }
                    }
                ]
            };
            chart.pie.setOption(option);
            chart.pie.on('click', function (param) {
                $.getScript('http://www1.pconline.com.cn/zt/gz20161118diannaocheng/js/echarts.min.js', function () {
                    // console.log(param.dataIndex)
                    pieselect(param.dataIndex)
                });
            })
        }
        initVote();
    }
    bindEvents() {
       $('.area3 .btn-list a').on('click', function () {
            sw1.slideTo($(this).index(), 500, false);//切换到第一个slide，速度为1秒
            $('.area3 .btn-list a').removeClass('current').eq($(this).index()).addClass('current');
        })
        $('.area4 .btn-list a').on('click', function () {
            sw2.slideTo($(this).index(), 500, false);//切换到第一个slide，速度为1秒
            $('.area4 .btn-list a').removeClass('current').eq($(this).index()).addClass('current');
        })
    }
    init() {
        this.swiper();
        this.vote();
        this.bindEvents();
    }
}
var main = new Main();
main.init();