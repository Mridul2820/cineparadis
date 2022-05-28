import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../context/user';
import { ChatEngine } from 'react-chat-engine';
import styled from 'styled-components';

const ChatPage = () => {
  const didMountRef = useRef(false);

  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      axios
        .get('https://api.chatengine.io/users/me/', {
          headers: {
            'project-id': process.env.REACT_APP_CHATENGINE,
            'user-name': user.email,
            'user-secret': user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          let formdata = new FormData();

          formdata.append('email', user.email);
          formdata.append('username', user.email);
          formdata.append('secret', user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios
              .post('https://api.chatengine.io/users/', formdata, {
                headers: {
                  'private-key': process.env.REACT_APP_CHATENGINEKEY,
                },
              })
              .then(() => setLoading(false))
              .catch((err) => console.log(err));
          });
        });
    }
  }, [user]);

  if (!user || loading) return 'Loading...';

  return (
    <PageContainer>
      <ChatEngine
        height="calc(100vh - 150px)"
        projectID={`${process.env.REACT_APP_CHATENGINE}`}
        userName={user.email}
        userSecret={user.uid}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 147px);
  border-top: 1px solid #999;
`;

export default ChatPage;
