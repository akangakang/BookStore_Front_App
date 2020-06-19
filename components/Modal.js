/* tslint:disable:no-console */
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import {
    Button,
    Modal,
    WhiteSpace,
    WingBlank,
    Toast,
    Provider, Tag,
} from '@ant-design/react-native';
export class BasicModalExample extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = () => {

            this.setState({
                visible: false,
            });
        };

        this.state = {
            visible: false,

        };
    }
    render() {
        const footerButtons = [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '支付', onPress: () => {console.log('ok') ;
        this.props.placeOrder;}},
        ];
        return (
            <View style={{paddingLeft:20}}>

                    <Button style={{width:90,height:30}} onPress={() => this.setState({ visible: true })}>
                        结算
                    </Button>


                <Modal
                    title="支付"
                    transparent
                    onClose={this.onClose}
                    maskClosable
                    visible={this.state.visible}
                    closable
                    footer={footerButtons}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text style={{ textAlign: 'center' }}>确认支付：{this.props.price}元</Text>
                        <Text style={{ textAlign: 'center' }}>{this.props.price}</Text>

                    </View>

                </Modal>

            </View>
        );
    }
}
export default () => (
    <Provider>
        <BasicModalExample />
    </Provider>
);
