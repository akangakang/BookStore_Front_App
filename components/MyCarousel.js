import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { Carousel } from '@ant-design/react-native';
export default class BasicCarouselExample extends React.Component {
    onHorizontalSelectedIndexChange(index) {
        /* tslint:disable: no-console */
        console.log('horizontal change to', index);
    }
    onVerticalSelectedIndexChange(index) {
        /* tslint:disable: no-console */
        console.log('vertical change to', index);
    }
    render() {
        return (
            <View style={{ marginTop: 10 ,marginBottom:20}}>
                <View style={{ paddingHorizontal: 15 }}>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={2}
                        autoplay
                        infinite
                        afterChange={this.onHorizontalSelectedIndexChange}
                    >
                        <View
                            style={[styles.containerHorizontal]}
                        >
                            <Image style={{width:381, height: 180}}
                                   source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589993307386&di=3cd2c7d08e28cc92091c1e8cc3f319f7&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3121109368%2C3206198902%26fm%3D214%26gp%3D0.jpg"}}
                            />
                        </View>
                        <View
                            style={[styles.containerHorizontal]}
                        >
                            <Image style={{width:381, height: 180}}
                                   source={{uri:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3750091168,2677158687&fm=26&gp=0.jpg"}}
                            />
                        </View>
                        <View
                            style={[styles.containerHorizontal]}
                        >
                            <Image style={{width:381, height: 180}}
                                   source={{uri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2879966122,3379082716&fm=26&gp=0.jpg"}}
                            />
                        </View>
                        <View
                            style={[styles.containerHorizontal]}
                        >
                            <Image style={{width:381, height: 180}}
                                   source={{uri:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1529292904,4087389526&fm=26&gp=0.jpg"}}
                            />
                        </View>
                        <View
                            style={[styles.containerHorizontal]}
                        >
                            <Image style={{width:381, height: 180}}
                                   source={{uri:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3465794080,3785861856&fm=26&gp=0.jpg"}}
                            />
                        </View>
                    </Carousel>

                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    containerVertical: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },
    text: {
        color: '#fff',
        fontSize: 36,
    },
});

