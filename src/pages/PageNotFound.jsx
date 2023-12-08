import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
    return (
        <main className={styles.pagenotfound}>
            <PageNav />

            <section>
                <h1>Page not found 😢</h1>
            </section>
        </main>
    );
}
