import styles from "./BrandSection.module.css";
export const BrandSection = () => {
  const marque = (
    <div className={`${styles["marquee-section"]} ${styles["animation-marquee-50"]}`}>
      {Array.from({ length: 18 }).map(() => {
        const randomNum = Math.floor(Math.random() * 9) + 1;

        const logos = require(`../../../assets/logos/logo-${randomNum}.svg`);

        return (
          <div className={`${styles["mx-3"]} ${styles["mx-lg-5"]} ${styles["f-w-24"]}`} key={Math.random()}>
            <a className="d-block" href="./category.html">
              <picture>
                <img className="img-fluid d-table mx-auto" src={logos} alt="" />
              </picture>
            </a>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="brand-section container-fluid">
      <div className={`${styles["bg-overlay-sides-white-to-transparent"]} bg-white py-5 py-md-7`}>
        <section className={`${styles["marquee"]} ${styles["marquee-hover-pause"]}`}>
          <div className={`${styles["marquee-body"]}`}>{marque}</div>
        </section>
      </div>
    </div>
  );
};
