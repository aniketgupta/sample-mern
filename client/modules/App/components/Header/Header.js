import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Header.css';

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  );

  return (
    <div className={styles.header}>
      <div className={styles['language-switcher']}>
        <ul>
          <li><FormattedMessage id="switchLanguage" /></li>
          {languageNodes}
        </ul>
      </div>
        {
          context.router.isActive('/', true)
            ? <a className={styles['login-button']} href="signin" onClick={props.toggleLoginForm}><FormattedMessage id="login" /></a>
            : null
        }
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/" ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          context.router.isActive('/', true)
            ?<div> 
            <a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>
            <a className={styles['add-post-button']} href="total_votes" onClick={props.toggleShowVotes}><FormattedMessage id="showVotes" /></a>
            <a className={styles['add-post-button']} href="give_vote" onClick={props.toggleAddVote}><FormattedMessage id="giveVote" /></a>
            </div>
            : null
        }
      </div>
 
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  toggleLoginForm: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Header;
