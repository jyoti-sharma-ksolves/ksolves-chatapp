import React from 'react';

class Header extends React.Component {
  constructor (props) {
    super (props);
    
    this.state = {
      show: false,
    }
  }

  showDropdown = (e) => {
    this.setState({ show: !this.state.show });
  }

  getSelectedValue = (e) => {
    localStorage.removeItem('document');
    window.location.href = "http://localhost:3000/sign-in";
  }

  render () {
    const {selectedUser, receiver, user} = this.props;

    const receiverInfo =
      selectedUser && selectedUser.filter (item => item.id === receiver);

    return (
      <div>
        {receiverInfo && receiverInfo.length > 0 && <div className="inline-display mr">{receiverInfo[0].first_name}{' '}{receiverInfo[0].last_name}</div>}
        {user && user.id &&
          <React.Fragment>
            <div className="inline-display">{user.first_name}{' '}{user.last_name}
            </div>

            <div className="user_img">
              <div className="profile_header" onClick={this.showDropdown}>
                {user.first_name.charAt(0).toUpperCase()}
              </div>
              {this.state.show &&
                <div id="myDropdown" className="dropdown-content">
                  <div onClick={this.getSelectedValue} >Logout</div>
                </div>
              }
          </div>
        </React.Fragment>
        }  
      </div>
    );
  }
}

export default Header;
