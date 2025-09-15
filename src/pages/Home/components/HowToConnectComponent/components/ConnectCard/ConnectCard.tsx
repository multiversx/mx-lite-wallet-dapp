import { FunctionComponent, SVGProps } from 'react';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styles } from './connectCard.styles';

interface ConnectCardPropsType {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkTitle: string;
  linkDownloadAddress: string;
}

export const ConnectCard = ({
  icon,
  title,
  description,
  linkTitle,
  linkDownloadAddress
}: ConnectCardPropsType) => {
  const IconComponent = icon;

  return (
    <div className={styles.connectCardContainer}>
      <IconComponent />

      <div className={styles.connectCardText}>
        <h2 className={styles.connectCardTitle}>{title}</h2>

        <p className={styles.connectCardDescription}>{description}</p>
      </div>

      <a
        href={linkDownloadAddress}
        target='_blank'
        className={styles.connectCardLink}
      >
        <span className={styles.connectCardLinkTitle}>{linkTitle}</span>

        <FontAwesomeIcon icon={faArrowRightLong} />
      </a>
    </div>
  );
};
