import { useRouter } from "next/router"

import styles from '../styles/Tollbar.module.css'

export function Toolbar() {
    const router = useRouter()
    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href="https://twitter.com/?lang=en"}>Twitter</div>
            <div>Github</div>
        </div>
    )
}