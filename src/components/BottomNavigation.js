import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Availability from "../pages/availability/Availability";
import DashBoard from "../pages/dashboard/DashBoard";

import IconF from "react-native-vector-icons/FontAwesome"
import IconM from "react-native-vector-icons/FontAwesome5"
import Profile from "../pages/profile/Profile";
import About from "../pages/profile/About";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../pages/authentication/Login";
import CompletedJobs from "../pages/orders/CompletedJobs";

const Tab = createBottomTabNavigator();

const BottomTabs = ({navigation}) => {

    const [authState, setAuthState] = useState()

    useEffect(() => {
        AsyncStorage.getItem("auth")
        .then((res) => {
            if(res === null){
                navigation.reset({
                    index: 0,
                    routes: [{name: 'login'}]
                })
                setAuthState(res)
                console.log(res)
            }
        })
        .catch((err) => {
          console.log(err);
        });
    }, [])


    if(authState === null){
        return(
        <Tab.Navigator>
            <Tab.Screen name="login" component={Login} options={{title: 'Dashboard', tabBarIcon: () =>( <IconM name="tools" size={30} color="green"/>),}}  />
        </Tab.Navigator>
        )
    }

    return(
        <Tab.Navigator initialRouteName="dashboard">
            <Tab.Screen name="dashboard" component={DashBoard} options={{title: 'Dashboard', tabBarIcon: () =>( <IconM name="tools" size={30} color="green"/>),}}  />
            <Tab.Screen name="completed-jobs" component={CompletedJobs} options={{title: 'Completed Jobs', tabBarIcon: () =>( <IconF name="user-circle" size={30} color="green"/>)}}/>
            <Tab.Screen name="availability" component={Availability} options={{title: 'Availability', tabBarIcon: () =>( <IconF name="user-circle" size={30} color="green"/>)}}/>
            <Tab.Screen name="profile" component={Profile} options={{title: 'Profile', tabBarIcon: () =>( <IconF name="user-circle" size={30} color="green"/>)}}/>
        </Tab.Navigator>
    )
}

export default BottomTabs