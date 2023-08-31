/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';

import { lightTheme } from './src/assets/constants/constants';

export default function Main() {
    return(
        <PaperProvider theme={lightTheme}>
            <App />
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);