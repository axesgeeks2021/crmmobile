import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MyComponent = (props) => {

    const { width } = useWindowDimensions()

    const theme = useTheme()

    return (
        <Card style={{ width: width - 40, paddingHorizontal: 10, overflow: 'hidden' }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', paddingHorizontal: 20 }}>
                <Card.Title title={props.project} subtitle={props.email} left={LeftContent} />
                <Text variant="bodyLarge">{props.size}</Text>
            </View>
            <Card.Content>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="dingding" size={30} color="#000" />
                    <Text variant="titleLarge">{props.title}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="dingding" size={30} color="#000" />
                    <Text variant="titleLarge">{props.nmi}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="dingding" size={30} color="#000" />
                    <Text variant="bodyMedium">{props.content}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="dingding" size={30} color="#000" />
                    <Text variant="bodyMedium">{props.description}</Text>
                </View>
            </Card.Content>
            {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
            {/* <Card.Actions>
                <Button style={{borderColor: theme.colors.darkGreen}}>Cancel</Button>
                <Button style={{backgroundColor: theme.colors.darkGreen}}>OK</Button>
            </Card.Actions> */}
        </Card>
    )
};

export default MyComponent;