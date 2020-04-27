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
      errorMessages: '',
    };
  }

  async componentWillMount () {
    const user = JSON.parse (localStorage.getItem ('document'));
    console.log(user)
    const userInfo = await this.getData (
      `http://localhost:8000/api/user-info?id=${user.result.id}`
    );
    console.log(userInfo)
    await this.setState ({user: userInfo});
  }

  shouldComponentUpdate (nextProps, nextState) {
    // if (this.state.user !== nextState.user) {
    //   return true;
    // }
    return this.state.user !== nextState.user ? true : false ;
  }

  async componentDidMount () {
    console.log(this.state.user, '+++++')
    const userList = await this.getData ('http://localhost:8000/api/user-list');
    
    console.log(userList)
    this.setState ({
      userList: userList,
      receiver_id: userList[0].id
    });

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
      .then (jsonData => {
        if (jsonData.err) {
          this.setState({ errorMessages: jsonData.err });
        }
        else if (jsonData.result) {
          return jsonData.result;
        }
      })
      .catch (err => {
        console.log (err);
        this.setState({ errorMessages: err });
      });
  };

  getChatData = () => {
    const {user, receiver_id} = this.state;

    if (user && receiver_id) {
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
          if (jsonData.err) {
            this.setState({errorMessages: jsonData.err});
          }
          else if (jsonData.status === 'Success') {
            this.setState ({chatData: jsonData.result});
          }
        })
        .catch (err => {
          console.log (err);
          this.setState({ errorMessages: err })
        });
    }
  };

  render () {
    const {user, chatData, receiver_id, userList} = this.state;

    const chatRoomRender = (!user === undefined) ? true : false;

    return (
      <div className="container">
        <h3 className="text-center">KSOLVES Chat app</h3>
        { !chatRoomRender &&
          <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_chat">
                <div className="recent_heading">
                  <h4>People</h4>
                </div>
              </div>
              <div className="inbox_chat">
                <UserList
                  user={user}
                  userList={userList}
                  receiver={this.receiver}
                  receiverId={receiver_id}
                />
              </div>
            </div>
            <ChatPanel
              user={user}
              chatData={chatData}
              receiver={receiver_id}
              userList={userList}
            />
          </div>
        </div>
        }
      </div>
    );
  }
}

export default ChatRoom;
