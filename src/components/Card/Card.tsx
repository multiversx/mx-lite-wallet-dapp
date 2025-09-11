import { PropsWithChildren } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WithClassnameType } from 'types';
import { styles } from './card.styles';

interface CardPropsType extends PropsWithChildren, WithClassnameType {
  title: string;
  description?: string;
  reference: string;
  anchor?: string;
}

export const Card = ({
  title,
  children,
  description,
  reference,
  anchor,
  'data-testid': dataTestId
}: CardPropsType) => (
  <div id={anchor} className={styles.cardContainer} data-testid={dataTestId}>
    <h2 className={styles.cardTitle}>
      {title}
      <a href={reference} target='_blank' className={styles.cardRef}>
        <FontAwesomeIcon icon={faInfoCircle} className={styles.cardRefIcon} />
      </a>
    </h2>

    {description && <p className={styles.cardDescription}>{description}</p>}
    {children}
  </div>
);
