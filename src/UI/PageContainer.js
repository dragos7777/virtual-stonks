import styles from "./PageContainer.module.css";

const PageContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default PageContainer;
