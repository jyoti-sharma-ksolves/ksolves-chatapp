import React from 'react';
import moment from 'react-moment';

class ChatPanel extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      value: '',
      receiver_id: 2,
      chatData: [],
    };
  }

  handleSendMessage = () => {
    const sender_id = this.props.user.id;
    const receiver_id = this.props.receiver;
    const {value} = this.state;

    if (value && value.length < 200) {
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
          created_at: new Date (),
        }),
      })
        .then (response => response.json ())
        .catch (e => {
          console.log (e);
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

  //    timeFormat = (time) => {
  //       const createdDate = new Date(time).toLocaleString();
  //       const dateArr = createdDate.split(',')
  //       const date = dateArr[0].replace('/', ' ')
  //       const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //       const dateStr = date.split(' ');
  //       const monthInt = dateStr[1].startsWith(0) ? dateStr[1].replace('0','') : dateStr[1];
  //       dateStr[1] = month['monthInt'];
  //       dateStr.join();

  //       return {
  //           date: dateStr.join(' '),
  //           hours: dateArr[1],
  //       }
  //     }

  render () {
    const {user, chatData, receiver} = this.props;

    return (
      <div>
        <div className="mesgs">
          <div className="msg_history">
            {chatData.length > 0 &&
              chatData.map (item => {
                return item.sender_id === user.id
                  ? <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{item.body}</p>
                        <span className="time_date">
                          25 Apr | 4:21 pm
                        </span>
                      </div>
                    </div>
                  : <div className="incoming_msg">
                      <div className="incoming_msg_img">
                        {' '}
                        <img src="https://ptetutorials.com/images/user-profile.png" />
                        {' '}
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{item.body}</p>
                          <span className="time_date">
                            25 Apr | 4:21 pm
                          </span>
                        </div>
                      </div>
                    </div>;
              })}
          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input
                type="text"
                className="write_msg"
                placeholder="Type a message"
                value={this.state.value}
                onChange={this.handleOnChange}
                onKeyPress={this.handleKeyPress}
              />
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
