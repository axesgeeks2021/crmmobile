import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" color='#003F91' style={{backgroundColor: '#fff'}}/>

const MyComponent = (props) => {

    const { width } = useWindowDimensions()

    const theme = useTheme()

    return (
        <Card style={{ width: width - 40, paddingHorizontal: 10, overflow: 'hidden', backgroundColor: '#003f91' }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '100%', paddingHorizontal: 20 }}>
                <Card.Title title={props.project} subtitle={props.title} left={LeftContent} />
                <View variant="bodyLarge"  style={{width: 35, height: 35,borderRadius: 20, backgroundColor:'#fff', justifyContent: 'center', alignItems:'center'}}>
                <Text style={{fontSize: 20, color: '#003F91',fontWeight:'bold'}}>{props.size}</Text></View>
            </View>
            <Card.Content>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="chevron-right" size={30} color="#fff" />
                    <Text style={{color: '#fff'}} variant="titleLarge">{props.name}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="chevron-right" size={30} color="#fff" />
                    <Text style={{color: '#fff'}} variant="titleLarge">{props.nmi}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', width: '100%', }}>
                    <Icon name="chevron-right" size={30} color="#fff" />
                    <Text style={{color: '#fff'}} variant="bodyMedium">{props.content}</Text>
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