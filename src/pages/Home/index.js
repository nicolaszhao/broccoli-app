import React, { useState, useEffect, useReducer } from 'react';
import * as api from '../../api';
import style from './index.module.scss';

const userFetchReducer = (state, { type, payload }) => {
  switch (type) {
    case 'FETCH_USER':
      return { ...state, fetching: true };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        fetching: false,
        data: payload,
        error: null,
      };
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        fetching: false,
        error: payload,
      };
    default:
      throw new Error();
  }
};

const useUserFetch = (userId) => {
  const [state, dispatch] = useReducer(userFetchReducer, {
    fetching: false,
    data: {},
    error: null,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchUser = async () => {
      dispatch({ type: 'FETCH_USER' });
      try {
        const data = await api.fetchUser();
        !didCancel && dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
      } catch (err) {
        !didCancel && dispatch({ type: 'FETCH_USER_FAILURE', payload: err });
      }
    };

    fetchUser();

    return () => {
      didCancel = true;
    };
  }, [userId]);

  return state;
};

const genUserId = () => Math.ceil(Math.random() * 100);

const Home = () => {
  const [userId, setUserId] = useState(genUserId());
  const { fetching, data, error } = useUserFetch(userId);

  return (
    <div className={style.container}>
      <h2>Home</h2>
      <section className={style.profile}>
        <h3>User Profile</h3>
        {fetching && <span className="loading">Loading...</span>}
        <dl>
          {Object.keys(data).map((field) => (
            <React.Fragment key={field}>
              <dt>
                {field}
                :
              </dt>
              <dd>{data[field]}</dd>
            </React.Fragment>
          ))}
        </dl>
        {error && (
          <p className={style.error}>
            <strong>Error:</strong>
            {error.message}
          </p>
        )}
        <footer className={style['profile-footer']}>
          <button
            type="button"
            className="button"
            onClick={() => setUserId(genUserId())}
          >
            Refresh
          </button>
        </footer>
      </section>
    </div>
  );
};

export default Home;
