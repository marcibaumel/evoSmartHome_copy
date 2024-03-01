import LandingPageCard from '../layout/LandingPageCard/LandingPageCard';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <LandingPageCard />
        </div>
    );
};

export default Home;
