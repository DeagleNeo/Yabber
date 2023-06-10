import React from 'react';
import GeneralSettingsTab from './GeneralSettingsTab';
import InvitationsTab from './InvitationsTab';
import SecurityTab from './SecurityTab';

const TabContent = ({
  activeTab,
  userInfo,
  setUserInfo,
  currentUser,
}) => (
  <div>
    {activeTab === 'GENERALSETTINGS_TAB' &&
      <GeneralSettingsTab
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser}
      />
    }

    {activeTab === 'INVITATIONS_TAB' &&
      <InvitationsTab />
    }

    {activeTab === 'SECURITY_TAB' &&
      <SecurityTab
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        currentUser={currentUser}
      />
    }
  </div>
);

export default TabContent;