import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import { MessageShape } from '../utils/MessageUtils';

const keyExtractor = item => item.id.toString()

export default class MessageList extends React.Component {
    
    static propTypes = {
        messages:PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func
    }

    renderMessageItem = ({ item }) => { const { onPressMessage} = this.props;
        return (
            <View key={item.id} style={styles.messageRow}>
                <TouchableOpacity onPress={() => onPressMessage(item)}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        )
    }

    renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case 'text': return (
                <View style={styles.messageBubble}>
                    <Text 
                    // style={styles.text}
                    >{text}</Text>
                    
                </View>
            );
            case 'image': return <Image 
            style={styles.image} 
            source={{ uri }} />;

            case 'location': return (
                <MapView style={styles.map}
                    initialRegion={{
                        ...coordinate,
                        latitudeDelta:0.08,
                        longitudeDelta:0.04,
                    }}>
                        <Marker coordinate={coordinate}></Marker>
                </MapView>
            )

            // case 'location':
            //     return (
                
            //     <MapView
            //         style={styles.map}
            //         initialRegion={{
            //         ...coordinate,
            //         latitudeDelta: 0.08,
            //         longitudeDelta: 0.04,
            //     }}
            //     >
                    
                    
            //     <MapView.Marker coordinate={coordinate} />
            //     </MapView>
            // )

            default: 
                return null
        }
    }

    static defaultProps = {
        onPressMessage: () => {                                                                                                                                                   }
    }

    render () {
        const { messages } = this.props;
        return (
            <FlatList
                style={styles.container}
                // inverted
                data={messages}
                renderItem={this.renderMessageItem}
                keyExtractor={keyExtractor}
                keyboardShouldPersistTaps={'handled'}
                />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        overflow: 'visible'
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 60,
        marginBottom: 10,
        marginRight: 8
    },
    messageBubble:{
        backgroundColor: '#0af088',
        padding: 10,
        borderRadius: 10,
        maxWidth: '100%'
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
      },
      map: {
        width: 200,
        height: 200,
        borderRadius: 20,
      },
})