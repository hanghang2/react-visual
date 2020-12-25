import React, {Component} from 'react';
import echarts from 'echarts'
import {withResizeDetector} from 'react-resize-detector';//组件宽度变化监听

class Component2 extends Component {
    /**
     * 父组件获取当前组件数据-去存储
     */
    getState = () =>{
        return {}
    }
    constructor(props){
        super(props)
        this.state = {
            ...this.props.ItemComponentData,
        }
        this.props.getState(this.getState);
    }
    componentDidMount() {
        this.myChart = echarts.init(this.echart);
        this.myChart.setOption(option)
    }
    
    render() {
        return (
            <div style={style1}>
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
}

let style1 = {
    width: '100%',
    height: '100%',
}
let option = {
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['蒸发量', '降水量']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        },
        {
            name: '降水量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
                data: [
                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
};


export default {
    ...withResizeDetector(Component2),
    name:'Component2',
};
