import React from 'react';
import moment from 'moment';
import Header from '../Components/Header';

class ChatPanel extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      value: '',
      receiver_id: 2,
      chatData: [],
      errorMessage: '',
    };
  }

  handleSendMessage = () => {
    const sender_id = this.props.user.id;
    const receiver_id = this.props.receiver;
    const {value} = this.state;

    if (value) {
      fetch ('http://localhost:8000/api/send-message', {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify ({
          sender_id,
          receiver_id,
          message: value,
          created_at: moment(new Date()).format(),
        }),
      })
        .then (response => response.json ())
        .then(jsondata => {
          if (jsondata.err) {
            this.setState({errorMessage: jsondata.err});
          }
        })
        .catch (err => {
          console.log (err);
          this.setState({errorMessage: err});
        });
    }
    this.setState ({value: ''});
  };

  handleOnChange = e => {
    this.setState ({value: e.target.value});
  };

  handleKeyPress = e => {
    if (e.charCode === 13) {
      this.handleSendMessage ();
    }
  };

  timeFor = (time) => {
    console.log(time);
    const datef = new Date(time).toString();
    const dateArray = datef.split(' ');
    const hours = moment(new Date(time)).format('h:mm a');

    return {
      date: dateArray[1],
      month: dateArray[2],
      hours
    }
  }

  render () {
    const {user, chatData, receiver, userList} = this.props;

    return (
      <div>
        <div className="header">
          <Header user={user} selectedUser={userList} receiver={receiver} />
        </div>
        <div className="mesgs">
          <div className="msg_history">
            {chatData.length > 0 &&
              chatData.map ((item, index) => {
                return item.sender_id === user.id
                  ? <div className="outgoing_msg" key={index}>
                      <div className="sent_msg word-wrap">
                        <p>{item.body}</p>
                        <span className="time_date">
                         {this.timeFor(item.created_at).date} {this.timeFor(item.created_at).month} | {this.timeFor(item.created_at).hours}
                        </span>
                      </div>
                    </div>
                  : <div className="incoming_msg" key={index}>
                      <div className="incoming_msg_img">
                        {' '}
                        <img src="https://ptetutorials.com/images/user-profile.png" />
                        {' '}
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg word-wrap">
                          <p>{item.body}</p>
                          <span className="time_date">
                            {this.timeFor(item.created_at).date} {this.timeFor(item.created_at).month} | {this.timeFor(item.created_at).hours}
                          </span>
                        </div>
                      </div>
                    </div>;
              })}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              {/* <input
                type="text"
                className="write_msg"
                placeholder="Type a message"
                value={this.state.value}
                onChange={this.handleOnChange}
                onKeyPress={this.handleKeyPress}
              /> */}
              <textarea
                autoFocus
                cols="127"
                // rows="2"
                // width="124px"
                // height="20px"
                // padding="10px"
                className="write_msg"
                maxLength="200"
                placeholder="Type a message"
                required
                value={this.state.value}
                onChange={this.handleOnChange}
                onKeyPress={this.handleKeyPress}
              >
              </textarea>
              <button
                className="msg_send_btn"
                type="button"
                onClick={this.handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPanel;
