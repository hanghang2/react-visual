import React, {Component} from 'react';
import echarts from 'echarts'
import {withResizeDetector} from 'react-resize-detector';//组件宽度变化监听

class Component1 extends Component {
    /**
     * 父组件获取当前组件数据-去存储
     */
    getState = () =>{
        return {
            showLegend:this.state.showLegend,
            shadow:this.state.shadow,
            stack:this.state.stack,
        }
    }
    constructor(props){
        super(props)
        this.state = {
            showLegend:true,
            shadow:true,
            stack:true,
            ...this.props.ItemComponentData,
        }
        this.props.getState(this.getState);
    }
    componentDidMount() {
        this.myChart = echarts.init(this.echart);
        this.myChart.setOption(this.getChartOption())
    }
    
    render() {
        return (
            <div
                style={style1}
                onDoubleClick={this.setComponentAttr}>
                <div
                    ref={echart => {
                        this.echart = echart;
                    }}
                    style={style1}>
                </div>
            </div>
        )
    }
    
    componentDidUpdate(prevProps) {
        const {width} = this.props;
        if (width !== prevProps.width) {//组件宽度变化
            this.chartResize();
        }
    }
    
    /**
     * dom大小100 ms内不再发生变化就去 resize
     */
    chartResize = () => {
        this.isResize = this.isResize ? this.isResize + 1 : 1;
        setTimeout(() => {
            this.isResize2 = this.isResize2 ? this.isResize2 + 1 : 1;
            if (this.isResize === this.isResize2) {
                this.isResize = 0;
                this.isResize2 = 0;
                if(this.myChart){
                    this.myChart.resize();
                }
            }
        
        }, 100)
    }
    /**
     * 设置组件属性
     */
    setComponentAttr = () => {
        let state = JSON.parse(JSON.stringify(this.state));
        this.props.setComponentAttr({
            style:[
                {
                    name:'图例显示：',
                    value:state.showLegend,
                    callbackStr:'showLegend',
                    type:'Boolean',
                },
                {
                    name:'阴影显示：',
                    value:state.shadow,
                    callbackStr:'shadow',
                    type:'Boolean',
                },
                {
                    name:'是否堆积：',
                    value:state.stack,
                    callbackStr:'stack',
                    type:'Boolean',
                }
            ],
            serve:[],
        },this.saveComponentAttr)
    }
    /**
     * 保存属性
     */
    saveComponentAttr = (attrData)=>{
        this.setState(()=>{
            let newObj = {};
            for (let i = 0; i < attrData.style.length; i++) {
                newObj[attrData.style[i].callbackStr] = attrData.style[i].value
            }
            return newObj;
        },()=>{
            //更新charts
            this.myChart.setOption(this.getChartOption(),true)
        })
    }
    /**
     * 获取charts配置
     */
    getChartOption = () => {
        let optionNew = JSON.parse(JSON.stringify(option));
        optionNew.legend.show = this.state.showLegend;
        optionNew.series = optionNew.series.map(item => {
            if(!this.state.shadow){
                delete item.areaStyle;
            }
            if(!this.state.stack){
                delete item.stack;
            }
            return item;
        })
        return optionNew;
    }
}

let style1 = {
    width: '100%',
    height: '100%',
}
let option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

export default {
    ...withResizeDetector(Component1),
    name:'Component1',
};

