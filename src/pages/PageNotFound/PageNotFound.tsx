import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { styles } from './pageNotFound.styles';

export const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.pageNotFoundContainer}>
      <div className={styles.pageNotFound}>
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.pageNotFoundSearchIcon}
        />

        <div className={styles.pageNotFoundContent}>
          <h4 className={styles.pageNotFoundTitle}>Page not found</h4>

          <span className={styles.pageNotFoundPath}>{pathname}</span>
        </div>
      </div>
    </div>
  );
};
