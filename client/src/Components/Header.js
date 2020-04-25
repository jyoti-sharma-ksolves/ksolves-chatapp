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
        {user && <div>{user.first_name}{' '}{user.last_name}</div>}
      </div>
    );
  }
}

export default Header;
