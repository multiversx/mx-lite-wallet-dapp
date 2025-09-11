import X from 'assets/img/x.svg?react';
import { styles } from './browserFrame.styles';

export const BrowserFrame = () => (
  <div className={styles.browserFrameContainer}>
    <div className={styles.browserFrameTopBar}>
      <div className={styles.browserFrameTopBarLeft}>
        {[...Array(3)].map((_, index) => (
          <span key={index} className={styles.browserFrameTopBarLeftDot} />
        ))}
      </div>

      <div className={styles.browserFrameTopBarRight}>
        <X />

        <div className={styles.browserFrameTopBarRightDots}>
          {[...Array(3)].map((_, index) => (
            <span key={index} className={styles.browserFrameTopBarRightDot} />
          ))}
        </div>
      </div>
    </div>

    <div className={styles.browserFrameScreenBg}>
      <div className={styles.browserFrameScreen} />
    </div>
  </div>
);
