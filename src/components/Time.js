// import { StyleSheet, Text, View, useWindowDimensions, SafeAreaView, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
// import React, { useEffect, useState } from 'react';

// import {Stopwatch, Timer} from "react-native-stopwatch-timer"


// const Time = () => {

//     const { width } = useWindowDimensions();

//     const [isActive, setIsActive] = useState(false);
//     const [isPaused, setIsPaused] = useState(true);
//     const [time, setTime] = useState(0);

//     useEffect(() => {
//         let interval = null;

//         if (isActive && isPaused === false) {
//             interval = setInterval(() => {
//                 setTime((time) => time + 10);
//             }, 10);
//         } else {
//             clearInterval(interval);
//         }
//         return () => {
//             clearInterval(interval);
//         };
//     }, [isActive, isPaused]);

//     const handleStart = () => {
//         setIsActive(true);
//         setIsPaused(false);
//     };

//     const handlePauseResume = () => {
//         setIsPaused(!isPaused);
//     };

//     const handleReset = () => {
//         setIsActive(false);
//         setTime(0);
//     };

//     const [isTimerStart, setIsTimerStart] = useState(false);
//     const [isStopwatchStart, setIsStopwatchStart] = useState(false);
//     const [timerDuration, setTimerDuration] = useState(90000);
//     const [resetTimer, setResetTimer] = useState(false);
//     const [resetStopwatch, setResetStopwatch] = useState(false);

//     return (
//         <View style={[styles.timer]}>
//             <Stopwatch laps msecs start={isStopwatchStart} reset={resetStopwatch} options/>
//             {/* <View style={{flexDirection: 'row'}}>
//                 <Text style={[styles.digits, { color: '#000' }]}>
//                     {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
//                 </Text>
//                 <Text style={[styles.digits, { color: '#000' }]}>
//                     {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
//                 </Text>
//                 <Text style={[styles.digits, styles.milisec]}>
//                     {("0" + ((time / 10) % 100)).slice(-2)}
//                 </Text>
//             </View>
//             <View style={[styles.ControlButtons]}>
//                 {
//                     isActive ? <View style={[styles.btngrp]}>
//                         <TouchableOpacity style={[styles.btn, {width: width / 2, backgroundColor: 'black', borderRadius: 0}]}
//                             onPress={handleReset}>
//                             <Text style={{fontSize: 22, color: '#fff', fontWeight: '600', backgroundColor: 'black'}}>Reset</Text>
//                         </TouchableOpacity>
//                         <Button title='Resume' onPress={() => setIsPaused(!isPaused)} />
//                         <TouchableOpacity style={[styles.btn, {width: width / 2, backgroundColor: 'black', borderRadius: 0}]}
//                             onPress={handlePauseResume}>
//                             <Text style={[{fontSize: 22, color: '#fff', fontWeight: '600'}]}>{isPaused ? "Resume" : "Pause"}</Text>
//                         </TouchableOpacity>
//                     </View> : <TouchableOpacity style={[styles.btn, styles.btnone, {width: width / 2}]}
//                         onPress={handleStart}>
//                         <Text style={{fontSize: 22, color: '#fff', fontWeight: '600'}}>Start</Text>
//                     </TouchableOpacity>
//                 }
//             </View> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     ControlButtons: {
//         marginHorizontal: 3,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     btngrp: {
//         alignItems: "center",
//         justifyContent: "space-around",
//     },
//     btn: {
//         // width: 100,
//         // height: 20,
//         borderRadius: 14,
//         marginVertical: 6,
//         paddingVertical: 10,
//         // border: 2px solid #e42a2a;
//         justifyContent: "center",
//         alignItems: "center",
//         cursor: "pointer",
//         color: "#f5f5f5",
//     },
//     btnone: {
//         backgroundColor: "#e42a2a",
//     },
//     timer: {
//         marginVertical: 3,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     digits: {
//         fontSize: 30,
//         color: "#f5f5f5",
//     },

//     milisec: {
//         color: "#e42a2a",
//     }
// })

// export default Time

// Example of React Native Timer and Stopwatch
// https://aboutreact.com/react-native-timer-stopwatch/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

// importing library to use Stopwatch and Timer
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const App = () => {
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState(90000);
  const [resetTimer, setResetTimer] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Example of React Native Timer and Stopwatch
        </Text>
        <View style={styles.sectionStyle}>
          <Stopwatch
            laps
            msecs
            start={isStopwatchStart}
            // To start
            reset={resetStopwatch}
            // To reset
            options={options}
            // Options for the styling
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <Text style={styles.buttonText}>
              {!isStopwatchStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.sectionStyle}>
          <Timer
            totalDuration={timerDuration}
            msecs
            // Time Duration
            start={isTimerStart}
            // To start
            reset={resetTimer}
            // To reset
            options={options}
            // Options for the styling
            handleFinish={() => {
              alert('Custom Completion Function');
            }}
            // Can call a function On finish of the time
            getTime={(time) => {
              console.log(time);
            }}
          />
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(!isTimerStart);
              setResetTimer(false);
            }}>
            <Text style={styles.buttonText}>
              {!isTimerStart ? 'START' : 'STOP'}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setIsTimerStart(false);
              setResetTimer(true);
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  sectionStyle: {
    flex: 1,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    marginTop: 10,
  },
});

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  },
};
