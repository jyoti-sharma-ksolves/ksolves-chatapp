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
      value: '',
      searchList: [],
      showUserList: [],
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
    this.setState ({
      userList: userList,
      showUserList: userList,
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

  handleChange =(e) => {
   this.setState({value: e.target.value});
  }

  search =(e) => {
   const { value, userList } = this.state;
   const searchUser = userList.filter(item => {
     if (item.first_name.includes(value)) {
       return item;
     }
   })

    this.setState({showUserList: searchUser});
  }

  handleSearch = (e) => {
    console.log(e)
   if (e.charCode === 13) {
     this.search();
   }
  }

  render () {
    const {user, chatData, receiver_id, userList, showUserList} = this.state;
    return (
      <div className="container">
        {/* <h3 className="text-center">Messaging</h3> */}
        {/* <div className="header">
          <Header user={user} selectedUser={userList} receiver={receiver_id} />
        </div> */}
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
            <div className="headind_chat">
                <div className="recent_heading">
                  <h4>People</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      value={this.state.value}
                      onChange={this.handleChange}
                      onKeyPress={this.handleSearch}
                      placeholder="Search"
                    />
                    {/* <span className="input-group-addon">
                    <button type="button" onClick={this.search}>Search</button>
                    </span> */}
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                <UserList
                  user={user}
                  userList={showUserList}
                  receiver={this.receiver}
                  receiverId={receiver_id}
                />
              </div>
            </div>
            <ChatPanel user={user} chatData={chatData} userList={userList} receiver={receiver_id} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
