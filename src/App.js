import React, {
  useEffect, useState, Suspense, lazy,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Modal } from '@totebox/ui';
import { useInvite } from './hooks';
import './app.scss';

const InviteForm = lazy(() => import('./components/InviteForm'));

const App = () => {
  const [formData, setFormData] = useState(null);
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [okModalVisible, setOkModalVisible] = useState(false);
  const { inviting, ok, error } = useInvite(formData);

  function handleInviteFormSend(data) {
    setFormData(data);
  }

  function handleInviteModalClose() {
    setFormData(null);
    setInviteModalVisible(false);
  }

  useEffect(() => {
    document.addEventListener('touchstart', () => {});
  }, []);

  useEffect(() => {
    if (ok) {
      setInviteModalVisible(false);
      setOkModalVisible(true);
    }
  }, [ok]);

  return (
    <main className="container">
      <header className="header">
        <h1>Broccoli &amp; Co.</h1>
      </header>
      <section className="content">
        <article className="main-content">
          <h2 className="slogan">
            A better way to
            <br />
            to enjoy every day.
          </h2>
          <p className="sub-slogan">Be the first to know when we launch.</p>
          <p>
            <button
              className="button invite-button"
              type="button"
              onClick={() => setInviteModalVisible(true)}
            >
              Request an invite
            </button>
          </p>
        </article>
      </section>
      <footer className="footer">
        <p className="footer-desc">
          Made with
          <span className="footer-love">❤</span>
          in Melbourne.
        </p>
        <p className="footer-license">
          &copy;
          <span className="footer-copy">{new Date().getFullYear()}</span>
          Broccoli &amp; Co. All rights reserved.
        </p>
      </footer>
      <Modal
        title="Request an invite"
        visible={inviteModalVisible}
        animation="flip"
        onClose={handleInviteModalClose}
      >
        <div className="invite-modal-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <InviteForm
              sending={inviting}
              onSend={handleInviteFormSend}
            />
          </Suspense>
          {error && (
            <p className="invite-error" data-testid="invite-error">
              {error.message}
            </p>
          )}
        </div>
      </Modal>
      <Modal
        title="All done!"
        visible={okModalVisible}
        animation="flip"
        onClose={() => setOkModalVisible(false)}
      >
        <div className="invite-modal-wrapper">
          <p className="invite-ok">
            You will be one of the first to experience Broccoli &amp; Co. when we launch.
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default hot(App);
