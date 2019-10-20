import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";

class Messages extends Component {
    renderClearAllBtn = () => (
        <button onClick={() => this.props.closeAllMessages()} 
            type="button" className="btn btn-light btn-sm">Clear all</button>
    );

    render() {
        const {messages} = this.props;
        return (
            <AlertContainer position="bottom-right">
                {messages.map(message => 
                    <Alert key={message.id} type={message.type} 
                        onDismiss={() => this.props.closeFunc(message.id)} timeout={4000}> 
                        <h5>{message.title}</h5>
                        <div>{message.content}</div>
                    </Alert>)}
                {messages.length === 0 ? null : this.renderClearAllBtn()}
	        </AlertContainer>
        )
    }
}

const mapSateToProps = (state) => {
    return {
        messages : state.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeFunc : (messageId) => dispatch({type : actionTypes.CLOSE_MESSAGE, messageId}),
        closeAllMessages : () => dispatch({type : actionTypes.CLOSE_ALL_MESSAGES})
    }
}

export default connect(mapSateToProps, mapDispatchToProps)(Messages);
