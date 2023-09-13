import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, useWindowDimensions, Modal } from 'react-native';
import { Button, useTheme } from 'react-native-paper';


const EditProfileView = ({navigation}) => {

    const { width } = useWindowDimensions()
    const theme = useTheme()

    const [showModal, setShowModal] = useState(false)

    const profile = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        bio: 'Software engineer and cat lover',
        avatar: 'https://example.com/jane-doe-avatar.png',
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');

    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');



    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://plus.unsplash.com/premium_photo-1674939149067-54c18a73efa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80' }}
                style={styles.background}
            />
            <View style={[styles.logoContainer, { width }]}>
                <Image
                    source={{ uri: 'https://www.solar365.net.au/assets/img/logoo.webp' }}
                    style={styles.logo}
                />
            </View>
            <View style={styles.form}>
                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    style={{ padding: 10 }}
                />
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Bio"
                    value={bio}
                    onChangeText={setBio}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit({ name, email, bio, avatar })}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 20, alignItems: 'center', marginTop: 30 }}>
                <Text style={{
                    fontSize: 18, marginVertical: 5


                }}>Already have account. Please</Text>
                <Button onPress={() => navigation.navigate('login')} mode='contained' style={{backgroundColor: theme.colors.darkGreen, borderRadius: 4}}>Click Here</Button>
            </View>
            <Modal transparent={false} visible={showModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Button title='Register as a Electrician' onPress={() => navigation.navigate('register')} />
                    <Button title='Register as a Installer' onPress={() => navigation.navigate('register')} />
                    <Button title='Go Back' onPress={() => setShowModal(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    form: {
        width: '95%',
        backgroundColor: "#fff",
        paddingHorizontal: 25,
        paddingVertical: 25,
        marginTop: 40,
        borderRadius: 5
    },
    label: {
        marginTop: 20,
    },
    logoContainer: {
        alignItems: 'center',
        // marginTop: 120,
        backgroundColor: "white"
    },
    logo: {
        width: 160,
        height: 120,
        borderRadius: 60,
        resizeMode: 'contain',
    },

    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarButtonText: {
        color: '#1E90FF',
        fontSize: 18,
    },
});

export default EditProfileView;