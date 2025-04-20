import styles from "../styles/loading-screen.module.css";

const LoadingScreen = ({ display }: { display: boolean }) => {
  return (
    <div
      className={`${styles.loading_screen} text-center loading-screen ${
        display ? "d-block" : "d-none"
      }`}
    >
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div>
          <h1 className="pt-3 text-white">
            Cargando...
            <div
              className="spinner-border text-light ms-auto"
              aria-hidden="true"
            />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
