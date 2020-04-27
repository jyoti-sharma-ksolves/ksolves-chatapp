import React from 'react';
import '../App.css';

class UserList extends React.Component {
  constructor (props) {
    super (props);
  }

  chatClass = id => {
    return id === this.props.receiverId ? 'chat_list active_chat' : 'chat_list';
  };

  strFormat = str => {
    return str.replace (str.charAt (0), str.charAt (0).toUpperCase ());
  };

  render () {
    let {userList, receiver, user} = this.props;
    userList = userList.filter (item => item.id !== user.id);

    return (
      <div>
        {userList &&
          userList.map (item => {
            return (
              <div
                className={this.chatClass (item.id)}
                key={item.id}
                onClick={e => {
                  receiver (e, item.id);
                }}
              >
                <div className="chat_people">
                  <div className="chat_img">
                    <div className="profile">
                      {item.first_name.charAt (0).toUpperCase ()}
                    </div>
                  </div>
                  <div className="chat_ib">
                    <h5>
                      {this.strFormat (item.first_name)}
                      {' '}
                      {this.strFormat (item.last_name)}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default UserList;
