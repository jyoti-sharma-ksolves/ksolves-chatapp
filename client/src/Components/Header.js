import React from 'react';

class Header extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    const {selectedUser, receiver, user} = this.props;
    const receiverInfo =
      selectedUser && selectedUser.filter (item => item.id === receiver);

    return (
      <div>
        {receiverInfo.length > 0 && <div className="inline-display mr">{receiverInfo[0].first_name}{' '}{receiverInfo[0].last_name}</div>}
        {Object.keys(user).length > 0 &&
          <React.Fragment>
            <div className="inline-display">{user.first_name}{' '}{user.last_name}
            </div>

            <div className="user_img">
              <div className="profile_header">
                {user.first_name.charAt(0).toUpperCase()}
              </div>
          </div>
        </React.Fragment>
        }
           
      </div>
    );
  }
}

export default Header;
