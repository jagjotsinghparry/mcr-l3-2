import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import {loadAlbums} from './actions/album';
import Loader from './components/Loader';

let {width} = Dimensions.get('window');

class App extends Component {
    componentDidMount() {
        this.props.loadAlbums();
    }

    last(arr) {
        return arr[arr.length - 1]
    }

    render() {
        if(this.props.loading) {
            return <Loader />;
        }

        return (
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <FlatList
                    renderItem={({item}) => {
                        return <View style={{ width: (width / 2) - 2 }}>
                            <Image
                                source={{uri: this.last(item['im:image']).label}}
                                style={{
                                    height: width / 2,
                                    width: width / 2
                                }}
                                resizeMode={'contain'}
                            />
                            <Text style={{color: 'white'}}>{item['im:name']['label']}</Text>
                        </View>
                    }}
                    data={this.props.albums}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={8}
                    numColumns={2}
                    ItemSeparatorComponent={() => {
                        return <View style={{ backgroundColor: 'red', width: width, height: 2 }} />
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        albums: state.albums.items,
        loading: state.albums.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadAlbums: () => loadAlbums(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
