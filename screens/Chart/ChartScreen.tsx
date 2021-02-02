import moment, { Moment } from 'moment';
import * as React from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
//import {LineChart} from "react-native-charts-wrapper";
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { IChild } from '../../models/IChild';
import { Gender } from '../../models/Gender';
import { useStoreActions, useStoreState } from '../../store';
import { girlHeight } from '../../constants/measurements';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { Rect, Text as TextSVG, Svg } from 'react-native-svg';

const chartConfigs = [
  {
    backgroundColor: '#000000',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
  // {
  //   backgroundColor: '#ffffff',
  //   backgroundGradientFrom: '#ffffff',
  //   backgroundGradientTo: '#ffffff',
  //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  // },
  // {
  //   backgroundColor: '#26872a',
  //   backgroundGradientFrom: '#43a047',
  //   backgroundGradientTo: '#66bb6a',
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   style: {
  //     borderRadius: 16
  //   }
  // },
  // {
  //   backgroundColor: '#000000',
  //   backgroundGradientFrom: '#000000',
  //   backgroundGradientTo: '#000000',
  //   color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
  // }, {
  //   backgroundColor: '#0091EA',
  //   backgroundGradientFrom: '#0091EA',
  //   backgroundGradientTo: '#0091EA',
  //   color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
  // },
  // {
  //   backgroundColor: '#e26a00',
  //   backgroundGradientFrom: '#fb8c00',
  //   backgroundGradientTo: '#ffa726',
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   style: {
  //     borderRadius: 16
  //   }
  // },
  // {
  //   backgroundColor: '#b90602',
  //   backgroundGradientFrom: '#e53935',
  //   backgroundGradientTo: '#ef5350',
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   style: {
  //     borderRadius: 16
  //   }
  // },
  // {
  //   backgroundColor: '#ff3e03',
  //   backgroundGradientFrom: '#ff3e03',
  //   backgroundGradientTo: '#ff3e03',
  //   color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
  // }
]

const chartConfig: AbstractChartConfig = {
  labelColor: (opacity = 1) => "black",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  backgroundGradientFrom: "white",
  backgroundGradientTo: "white",
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

export default function ChartScreen() {
  let [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0, visible: false, value: 0 })
  const saveChild = useStoreActions(actions => actions.child.saveChild);
  const childName = useStoreState(state => state.child.childName);
  const width = Dimensions.get('window').width * 0.85
  const height = 220
  useEffect(() => {
    // Update the document title using the browser API
    var date: string = moment().format("YYYY-MM-DD");

  });
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: girlHeight.slice(0, 5).map(gh => gh.month.toString()),
          datasets: [
            {
              data: girlHeight.slice(0, 5).map(gh => gh.p15),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              withDots:false
            },
            {
              data: girlHeight.slice(0, 5).map(gh => gh.p85),
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`
            }
          ]
        }}
        width={width}
        height={height}
        chartConfig={chartConfig}
        onDataPointClick={(data) => {

          let isSamePoint = (tooltipPos.x === data.x
            && tooltipPos.y === data.y)

          isSamePoint ? setTooltipPos((previousState) => {
            return {
              ...previousState,
              value: data.value,
              visible: !previousState.visible
            }
          })
            :
            setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

        }}
        decorator={() => {
          return tooltipPos.visible ? 
            <Svg>
              <Rect x={tooltipPos.x - 15}
                y={tooltipPos.y + 10}
                width="60"
                height="50"
                fill="black" />
              <TextSVG
                x={tooltipPos.x +8}
                y={tooltipPos.y + 25}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle">
                categ
              </TextSVG>
              <TextSVG
                x={tooltipPos.x + 5}
                y={tooltipPos.y + 40}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle">
                {tooltipPos.value}
              </TextSVG>
              <TextSVG
                x={tooltipPos.x + 8}
                y={tooltipPos.y + 55}
                fill="white"
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle">
                categ
              </TextSVG>
            </Svg>
           : null
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
