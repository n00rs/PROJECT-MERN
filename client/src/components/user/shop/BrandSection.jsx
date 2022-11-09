import styles from "./BrandSection.module.css";
const randomNum = Math.floor(Math.random() * 9) + 1;
export const BrandSection = () => {
  const marque = (
    <div class={`${styles["marquee-section"]} ${styles["animation-marquee-50"]}`}>
      {Array.from({ length: 18 }).map(() => {

        const logos = require(`../../../assets/logos/logo-${randomNum}.svg`);
        
        return (
          <div class={`${styles["mx-3"]} ${styles["mx-lg-5"]} ${styles["f-w-24"]}`}>
            <a class="d-block" href="./category.html">
              <picture>
                <img class="img-fluid d-table mx-auto" src={logos} alt="" />
              </picture>
            </a>
          </div>
        );
      })}
    </div>
  );

  return (
    <div class="brand-section container-fluid">
      <div class={`${styles["bg-overlay-sides-white-to-transparent"]} bg-white py-5 py-md-7`}>
        <section class={`${styles["marquee"]} ${styles["marquee-hover-pause"]}`}>
          <div class={`${styles["marquee-body"]}`}>{marque}</div>
        </section>
      </div>
    </div>
  );
};
