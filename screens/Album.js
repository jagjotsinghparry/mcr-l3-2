import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    Linking,
    TouchableOpacity
} from 'react-native';
import moment from "moment";

let {width} = Dimensions.get('window');

export default class Album extends Component {
    constructor(props) {
        super(props);

        this.state = {
            album: null
        };
    }

    componentDidMount() {
        this.setState({
            album: this.props.navigation.getParam('album')
        });
    }

    last(arr) {
        return arr[arr.length - 1]
    }

    render() {
        if (this.state.album !== null) {
            return <View style={{padding: 20, flex: 1}}>
                <Image
                    source={{uri: this.last(this.state.album['im:image']).label}}
                    style={{height: width - 40, width: width - 40}}
                    resizeMode={'contain'}
                />
                <Text style={{
                    fontWeight: 'bold',
                    marginTop: 10,
                    fontSize: 18,
                    width: width - 40
                }}>{this.state.album['im:name']['label']}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(this.state.album['im:artist']['attributes']['href'])
                    }}
                >
                    <Text style={{fontSize: 16, color: 'blue'}}>{this.state.album['im:artist']['label']}</Text>
                </TouchableOpacity>
                <Text>
                    {this.state.album['category']['attributes']['term']} · {moment(this.state.album['im:releaseDate']['label']).format('YYYY')} · {this.state.album['im:itemCount']['label']} Songs
                </Text>
                <Text>Price: {this.state.album['im:price']['label']}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(this.state.album['link']['attributes']['href'])
                    }}
                    style={{backgroundColor: 'black', borderRadius: 5, paddingVertical: 5, marginTop: 20}}
                >
                    <Text style={{color: 'white', textAlign: 'center'}}>Buy Now</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <Text style={{color: 'grey'}}>{this.state.album['rights']['label']}</Text>
            </View>
        } else {
            return <View/>;
        }
    }
}
