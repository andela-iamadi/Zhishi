import React, {PropTypes} from 'react';

const SettingsSection = props => {
  return (
    <aside className="four wide computer only column">
      <div className="sidebar wide column row">
        <h2 className="headers">Settings</h2>
        <div className="ui divider"></div>
        <div className="ui grid two column row settings">
          <div className="column">
            <label>Notifications: </label>
          </div>
          <div className="column">
            <div className="ui test toggle checkbox">
              <input className="slackToggle" type="checkbox"
                onChange={props.handleSlackToggle}
                checked={props.slackToggle}
              />
              <label></label>
            </div>
          </div>
        </div>
        <div className="ui divider"></div>
        <div className="ui grid  two column row settings">
          <div className="column">
            <label>Newsletter: </label>
          </div>
          <div className="column">
            <div className="ui test toggle checkbox">
              <input className="newsletterToggle" type="checkbox"
                onChange={props.handleNewsletterToggle}
                checked={props.newsletterToggle}
              />
              <label></label>
            </div>
          </div>
        </div>
        <div className="ui divider"></div>

      </div>
    </aside>
  );
};

SettingsSection.propTypes = {
  slackToggle: PropTypes.bool,
  newsletterToggle: PropTypes.bool,
  handleSlackToggle: PropTypes.func,
  handleNewsletterToggle: PropTypes.func,
  userActions: PropTypes.object,
  currentUser: PropTypes.object,
  user: PropTypes.object,
  activities: PropTypes.array
};

export default SettingsSection;
