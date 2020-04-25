import React from 'react';
import Header from '../Components/Header';
import UserList from '../Components/UserList';
import ChatPanel from '../Components/ChatPanel';
import '../App.css';

class ChatRoom extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      messages: [],
      user: {},
      result: {},
      userList: [],
      receiver_id: '',
      chatData: [],
    };
  }

  async componentWillMount () {
    const user = JSON.parse (localStorage.getItem ('document'));

    const userInfo = await this.getData (
      `http://localhost:8000/api/user-info?id=${user.result.id}`
    );
    this.setState ({user: userInfo.result});
  }

  async componentDidMount () {
    const userList = await this.getData ('http://localhost:8000/api/user-list');
    this.setState ({userList: userList, receiver_id: userList[0].id});

    setInterval (() => {
      this.getChatData ();
    }, 3000);
  }

  receiver = (e, id) => {
    this.setState ({receiver_id: id}, () => {
      this.getChatData ();
    });
  };

  getData = async url => {
    return fetch (url, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      method: 'GET',
    })
      .then (response => response.json ())
      .catch (e => {
        console.log (e);
      });
  };

  getChatData = () => {
    const {user, receiver_id} = this.state;

    fetch (
      `http://localhost:8000/api/receive-message?sender_id=${user.id}&receiver_id=${receiver_id}`,
      {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        method: 'GET',
      }
    )
      .then (response => response.json ())
      .then (jsonData => {
        this.setState ({chatData: jsonData});
      })
      .catch (e => {
        console.log (e);
      });
  };

  render () {
    const {user, chatData, receiver_id, userList} = this.state;
    return (
      <div class="container">
        <h3 class="text-center">Messaging</h3>
        <div className="header">
          <Header user={user} selectedUser={userList} receiver={receiver_id} />
        </div>
        <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <UserList
                user={user}
                userList={userList}
                receiver={this.receiver}
                receiverId={receiver_id}
              />
            </div>
            <ChatPanel user={user} chatData={chatData} receiver={receiver_id} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
