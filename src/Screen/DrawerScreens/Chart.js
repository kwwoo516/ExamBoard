import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import ModalEx from '../ModalEx';


class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            score : this.props.score,
            colname : Object.keys(this.props.score),
            value : [],
        }
        this.state.value = this.props.score.map((item, index) => {
            return item[this.props.examId];
        })
    }

    openModal = () => {
        this.setState({...this.state, open : true});
    }
    closeModal = () => {
        this.setState({...this.state, open : false});
    }

    render(){
        if(this.state.value.length > 0){
        return (
        <View>
            <Text
                style={{fontSize:20,fontWeight:'bold',textAlign:"center"}}>
                    SCORE CHART
            </Text>
            <LineChart
            data={{
                labels: this.state.colname,
                datasets: [
                {
                    data: this.state.value,
                }
                ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            yAxisLabel=""
            yAxisSuffix="점"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(2, 2, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                borderRadius: 10
                },
                propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
            />
        </View>
        );
        }
        else{
            return <ModalEx open = {() => this.openModal()} close = {() => this.closeModal()} header = {'Loading...'}></ModalEx>
        }
    }
  }

  export default Chart;