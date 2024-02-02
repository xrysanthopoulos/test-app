import React from 'react';
import PromoStyle from '../styles/Promo.module.css';

const Promo = () => {
  return (
    <div className={PromoStyle.promoContainer}>
      <img src='https://s3-alpha-sig.figma.com/img/3860/1e93/abf690b868be1d4e7ca2cdf326c446f5?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZYMPi7vey6EngPpFqxnXOtdH3eSa4e15teEaz-Wqey0JaG1JSSPXTuG~Beib99KxXPUD5R2s15v76~2ISyfo-9SDI2yBrV-iBXZ1PB5pyj7j3-bYlvFl20D2Zu3lIhDSTGr5d6eQmaVnc71mXJmhzwKK8UFWqG0iudNLS8fIPgSZHHcUv-PEASC1gz358iKaYN5vGetK2gkarDA~zx-mRhNde66HjW45e4a~O2szECknFyxWe2dNlHO5bZxohiZ7ItJ67zzt94V4m1NoFMCguGqj42tFEp0Lsos4PvjbkgsQ-lcjzMmxyU9DHmNnFE~FGtVJ8rYseoZRixOkTHNvig__' 
      alt="Cover" className={PromoStyle.coverImage} />
      <div className={PromoStyle.overlay}>
        <h2 className={PromoStyle.text}>Δε βρηκατε αυτο που ψαχνετε;</h2>
        <button className={PromoStyle.button}>
        Επικοινωνήστε μαζί μας
        </button>
      </div>
    </div>
  );
};

export default Promo;
