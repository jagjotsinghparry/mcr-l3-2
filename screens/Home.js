import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    Button,
    Modal,
    TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import {loadAlbums, sortAlbums, toggleModal} from '../actions/album';
import Loader from '../components/Loader';

let {width} = Dimensions.get('window');

class Home extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <Button
                    title={'Sort'}
                    color="#000000"
                    onPress={navigation.getParam('showModal')}
                />
            )
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            priceSort: null,
            artistSort: null,
            releaseDateSort: null
        }
    }

    componentDidMount() {
        this.props.loadAlbums();
        this.props.navigation.setParams({ showModal: this.props.toggleModal });
    }

    last(arr) {
        return arr[arr.length - 1]
    }

    render() {
        if (this.props.loading) {
            return <Loader/>;
        }

        return (
            <View style={{flex: 1}}>
                <FlatList
                    renderItem={({item, index}) => {
                        return <View
                            style={{
                                width: (width / 2) - 1,
                                marginRight: (index % 2 === 0) ? 1 : 0,
                                marginLeft: (index % 2 === 1) ? 1 : 0
                            }}
                        >
                            <Image
                                source={{uri: this.last(item['im:image']).label}}
                                style={{
                                    height: width / 2,
                                    width: width / 2
                                }}
                                resizeMode={'contain'}
                            />
                            <View
                                style={{width: (width / 2) - 1, padding: 7}}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{flex: 1, fontWeight: 'bold'}}
                                >
                                    {item['im:name']['label']}
                                </Text>
                                <Text>
                                    {item['im:artist']['label']}
                                </Text>
                                <Text>{item['category']['attributes']['term']} · {moment(item['im:releaseDate']['label']).format('YYYY')}</Text>
                            </View>
                        </View>
                    }}
                    data={this.props.albums}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={8}
                    numColumns={2}
                    ItemSeparatorComponent={() => {
                        return <View style={{backgroundColor: 'white', width: width, height: 2}}/>
                    }}
                />
                <Modal
                    visible={this.props.modal}
                    onRequestClose={() => this.props.toggleModal()}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{fontWeight: 'bold', marginVertical: 5}}>Sort By:</Text>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('price', "ASC")}>
                            <Text>Price ASC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('price', "DESC")}>
                            <Text>Price DESC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('artist', 'ASC')}>
                            <Text>Artist ASC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('artist', 'DESC')}>
                            <Text>Artist DESC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('releaseDate', 'ASC')}>
                            <Text>Release Date ASC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.sortAlbums('releaseDate', 'DESC')}>
                            <Text>Release Date DESC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.toggleModal()}
                        >
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        albums: state.albums.items,
        loading: state.albums.loading,
        modal: state.albums.modal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadAlbums: () => loadAlbums(dispatch),
        sortAlbums: (attribute, direction) => sortAlbums(attribute, direction, dispatch),
        toggleModal: () => dispatch(toggleModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
