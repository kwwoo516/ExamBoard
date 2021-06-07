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


class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            score : this.props.score,
            colname : Object.keys(this.props.score),
            value : Object.values(this.props.score),
        }
    }

    render(){
        return (
        <View>
            <Text>Bezier Line Chart</Text>
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
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                borderRadius: 16
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
  }

  export default Chart;